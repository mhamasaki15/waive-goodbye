var express = require('express');
var router = express.Router();
var async = require('async');
var path = require('path');
var request = require('request');
var fs = require("fs");

var mongoose = require('mongoose');
var EventSchema = require("../models/EventSchema");
var RecipientSchema = require("../models/RecipientSchema");

var 	email = "sirawan@usc.edu",				// your account email
    	password = "nosleep",			// your account password
    	integratorKey = "fa2dce99-1a16-48f4-b63d-603edbfb3f13",			// your Integrator Key (found on the Preferences -> API page)
		recipientName = "Melanie Hamasaki",			// recipient (signer) name
    	documentName = "pdfs/document.pdf",			// copy document with this name into same directory!
    	baseUrl = ""; 				// we will retrieve this through the Login call



/* Should take trip id as parameter. Should authenticate that user is the user
who created trip, then send back information about trip. This is probably gonna
be a HUGE get */
router.post('/create', function(req, res, next) {
	console.log(req.body);
	var recipientNames = req.body.contactNames;
	var recipientEmails = req.body.contactEmail;
	console.log(recipientNames);
	console.log(recipientEmails);
	var eventName = req.body.name;
	var eventDate = Date(req.body.date);
	var pdfName = req.body.pdfString;//req.body.pdfName; //TODO
	var sender = "value1";
    var recipientObjects;
    documentName = "pdfs/" + pdfName;

	console.log(sender);
	console.log(eventName);
	console.log(eventDate);


	var newEvent = new EventSchema({createdBy: sender, name: eventName, date: eventDate});
	newEvent.save(function (err){
		console.log("great success");
		recipientObjects = [ ];
		for (i=0; i<recipientNames.length; i++){
			recipientObjects.push({
				email: recipientEmails[i],
				name: recipientNames[i],
				status: false,
				tripId: newEvent._id// uhh also the url
			});
		}

		RecipientSchema.collection.insert(recipientObjects, function(err){
			if (err){
				console.log(err);
			}
			else{
				console.log("Success");
			}
		});
	});

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
            var tabs_zoo = {
                "signHereTabs": [{
                    "xPosition":"150",
                    "yPosition":"535",
                    "documentId":"1",
                    "pageNumber":"1"
                }]
            };

            var tabs_prom = {
                "signHereTabs":[{
                    "xPosition":"150",
                    "yPosition":"320",
                    "documentId":"1",
                    "pageNumber":"1"
                }]
            }

            var tabs;
            if (pdfName == "zoo_permission_slip.pdf") tabs = tabs_zoo;
            else if (pdfName == "school_dance_form.pdf") tabs = tabs_prom;
			// var tabs = {
			// 	"signHereTabs": [{
			// 		"xPosition": "100",
			// 		"yPosition": "100",
			// 		"documentId": "1",
			// 		"pageNumber": "1"
			// 	}]
			// }; //for use in signers
			var signers = [ ]; //todo
			var id = 1;

			for (i=0; i<recipientNames.length; i++){
				signers.push({
					email: recipientEmails[i],
					name: recipientNames[i],
					recipientId: id++,
					tabs: tabs
				});
			}

			//TODO: get all signers
	    	var url = baseUrl + "/envelopes";
	    	// following request body will place 1 signature tab 100 pixels to the right and
	    	// 100 pixels down from the top left of the document that you send in the request
			var body = {
				"recipients": {
					"signers": signers/*[{
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
					}]*/
				},
				"emailSubject": 'DocuSign API - Signature Request on Document Call',
				"documents": [{
					"name": documentName,
					"documentId": 1,
				}],
				"status": "sent",
			};
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
			request(options, function(err, response, body) {
				parseResponseBody(err, response, body);
				console.log("xd");
				return res.status(200).send("test").end();
			});
			console.log("i here");
			//next();
		} // end function
	]);

});


/* Should take trip id as parameter, as well as user id. Should authenticate that
user is the user who is invited on the trip (by email) And display all
the relevant information, which includes overview, forms, and opt in */
//this is called from the dashboard
router.get('/overview/:eventName', function(req, res, next) {
	var sender = "value1";
	console.log(req);
	var eventName = req.params.eventName;
	console.log(eventName);

	EventSchema.findOne({createdBy: sender, name: eventName}, function(err, obj){
		if (err){
			console.log(err);
		}
		else{
			console.log(obj);
			var resp = {
				body: {
					recipients: [ ]
				}
			};
			RecipientSchema.find({tripId: obj._id}).exec(function(err, recipients){
				recipients.forEach(function(element){
					resp.body.recipients.push({
						name: element.name,
						email: element.email,
						status: element.status,
						documentUrl: element.documentUrl
					});
				});
				res.json(resp);
			});
		}
	});
});

router.get('/responses', function(req, res, next){

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
