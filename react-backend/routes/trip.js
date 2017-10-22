var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var docusign = require('docusign-esign');
var async = require('async');
var path = require('path');
var request = require('request');
var fs = require("fs");

// let integratorKey = "ex-key",
// 	email = "sirawan@usc.edu",
// 	password = "nosleep",
// 	recipientName = "test",
// 	recipientEmail = "mhamasak@usc.edu";


// const creds = JSON.stringify({
// 	Username: 'sirawan@usc.edu',
// 	Password: 'nosleep',
// 	IntegratorKey: 'fa2dce99-1a16-48f4-b63d-603edbfb3f13'
// });
/*var integratorKey = 'fa2dce99-1a16-48f4-b63d-603edbfb3f13';
var email = 'sirawan@usc.edu';
var password = 'nosleep';
var docusignEnv = 'demo';
var fullName = 'Melainie Hamasaki';
var recipientEmail = 'mhamasak@usc.edu';
*/
// var baseUrl = 'https://demo.docusign.net/restapi';
// var integratorKey = 'fa2dce99-1a16-48f4-b63d-603edbfb3f13';
// var oAuthBaseUrl = 'account-d.docusign.com';
// var redirectURI = 'https://www.docusign.com/api';
// //var userId = '075c1c15-90bb-49a2-bda4-5cbc5cf6fbe9';
// var userId = 'sirawan';
// var privateKeyFilename = 'keys/docusign_private_key.txt';

var 	email = "sirawan@usc.edu",				// your account email
    	password = "nosleep",			// your account password
    	integratorKey = "fa2dce99-1a16-48f4-b63d-603edbfb3f13",			// your Integrator Key (found on the Preferences -> API page)
		recipientName = "Melanie Hamasaki",			// recipient (signer) name
    	documentName = "pdfs/document.pdf",			// copy document with this name into same directory!
    	baseUrl = ""; 				// we will retrieve this through the Login call


/* Should take trip id as parameter. Should authenticate that user is the user
who created trip, then send back information about trip. This is probably gonna
be a HUGE get */
router.get('/organizer/summary', function(req, res, next) {
	//Should give trip id
	async.waterfall(
	[
		function(next) {
			var url = "https://demo.docusign.net/restapi/v2/login_information";
			var body = "";	// no request body for login api call

			// set request url, method, body, and headers
			var options = initializeRequest(url, "GET", body, "sirawan@usc.edu", "nosleep");

			// send the request...
			request(options, function(err, res, body) {
				if(!parseResponseBody(err, res, body)) {
					console.log('err');
					return;
				}
				baseUrl = JSON.parse(body).loginAccounts[0].baseUrl;
				console.log('baseUrl');
				next(null); // call next function
			});
		},

		function(next) {
	    	var url = baseUrl + "/envelopes";
	    	// following request body will place 1 signature tab 100 pixels to the right and
	    	// 100 pixels down from the top left of the document that you send in the request
			var body = {
				"recipients": {
					"signers": [{
						"email": email,
						"name": recipientName,
						"recipientId": 1,
						"tabs": {
							"signHereTabs": [{
								"xPosition": "100",
								"yPosition": "100",
								"documentId": "1",
								"pageNumber": "1"
							}]
						}
					}]
				},
				"emailSubject": 'DocuSign API - Signature Request on Document Call',
				"documents": [{
					"name": documentName,
					"documentId": 1,
				}],
				"status": "sent",
			};
			//(dump(body));

			// set request url, method, body, and headers
			var options = initializeRequest(url, "POST", body, email, password);

			// change default Content-Type header from "application/json" to "multipart/form-data"
			options.headers["Content-Type"] = "multipart/form-data";

			// configure a multipart http request with JSON body and document bytes
			options.multipart = [{
						"Content-Type": "application/json",
						"Content-Disposition": "form-data",
						"body": JSON.stringify(body),
					}, {
						"Content-Type": "application/pdf",
						'Content-Disposition': 'file; filename="' + documentName + '"; documentId=1',
						"body": fs.readFileSync(documentName),
					}
			];

			// send the request...
			request(options, function(err, res, body) {
				parseResponseBody(err, res, body);
			});
		} // end function

	]);
	return res.status(200);

// 	async.waterfall([
// 		function initApiClient (next) {
// 			console.log("test");

// 			var oauthLoginUrl = apiClient.getJWTUri(integratorKey, redirectURI, oAuthBaseUrl);
// 			//console.log(oauthLoginUrl);
//     		apiClient.configureJWTAuthorizationFlow(path.resolve(__dirname, privateKeyFilename), oAuthBaseUrl, integratorKey, userId, 5, next);
// 			console.log("hello");
// 		},
// 		function login (next) {
// 			console.log('w/e');
// 			    // login call available off the AuthenticationApi
// 		    var authApi = new docusign.AuthenticationApi();

// 		    // login has some optional parameters we can set
// 		    var loginOps = {};
// 		    loginOps.apiPassword = 'true';
// 		    loginOps.includeAccountIdGuid = 'true';
// 		    authApi.login(loginOps, function (err, loginInfo, response) {
// 		    	console.log("hasdfasdf");
// 		      if (err) {
// 		        return next(err);
// 		      }
// 		      if (loginInfo) {
// 		        // list of user account(s)
// 		        // note that a given user may be a member of multiple accounts
// 		        var loginAccounts = loginInfo.loginAccounts;
// 		        console.log('LoginInformation: ' + JSON.stringify(loginAccounts));
// 		        var loginAccount = loginAccounts[0];
// 		        var accountId = loginAccount.accountId;
// 		        var baseUrl = loginAccount.baseUrl;
// 		        var accountDomain = baseUrl.split("/v2");

// 		        // below code required for production, no effect in demo (same domain)
// 		        apiClient.setBasePath(accountDomain[0]);
// 		        docusign.Configuration.default.setDefaultApiClient(apiClient);
// 		        next(null, loginAccount);
// 		      }
// 		    });

// 		}
// 		]);
// //temp, get rid of this later


});

/* Should get the forms from a specific user that the organizer requested */
router.get('/organizer/form', function(req, res, next) {

});

/* Should send out all the emails for the parents of the children trying to
receive the emails. Should take trip id as parameter, and also message used
to start the trip. Return true if successful */
router.post('/organizer/start', function(req, res, next) {

});

/* Should only send emails to those people who SUCK aka haven't responded yet */
router.post('/organizer/remind', function(req, res, next) {

});

/* Should take trip id as parameter, as well as user id. Should authenticate that
user is the user who is invited on the trip (by email) And display all
the relevant information, which includes overview, forms, and opt in */
//this is called from the dashboard
router.get('/overview', function(req, res, next) {

});


/* Should take all the trip information in the request body, and do all the necessary
work to insert it all in the database. Should return true if successful */
router.post('/', function(req, res, next) {

});




function initializeRequest(url, method, body, email, password) {
	var options = {
		"method": method,
		"uri": url,
		"body": body,
		"headers": {}
	};
	addRequestHeaders(options, email, password);
	return options;
}



///////////////////////////////////////////////////////////////////////////////////////////////
function addRequestHeaders(options, email, password) {
	// JSON formatted authentication header (XML format allowed as well)
	dsAuthHeader = JSON.stringify({
		"Username": email,
		"Password": password,
		"IntegratorKey": integratorKey	// global
	});
	// DocuSign authorization header
	options.headers["X-DocuSign-Authentication"] = dsAuthHeader;
}

///////////////////////////////////////////////////////////////////////////////////////////////
function parseResponseBody(err, res, body) {
	console.log("\r\nAPI Call Result: \r\n", JSON.parse(body));
	if( res.statusCode != 200 && res.statusCode != 201)	{ // success statuses
		console.log("Error calling webservice, status is: ", res.statusCode);
		console.log("\r\n", err);
		return false;
	}
	return true;
}


module.exports = router;
