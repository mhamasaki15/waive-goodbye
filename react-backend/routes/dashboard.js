var express = require('express');
var router = express.Router();
var passport = require('passport');
var EventSchema = require("../models/EventSchema");
var 	email = "sirawan@usc.edu",				// your account email
    	password = "nosleep",			// your account password
    	integratorKey = "fa2dce99-1a16-48f4-b63d-603edbfb3f13",			// your Integrator Key (found on the Preferences -> API page)
		recipientName = "Melanie Hamasaki",			// recipient (signer) name
    	documentName = "pdfs/document.pdf",			// copy document with this name into same directory!
    	baseUrl = "";
var request = require('request');

router.get('/', function(req,res,next){
    var url = "https://demo.docusign.net/restapi/v2/accounts/3916189/envelopes/";
    var options = initializeRequest(url, "GET", "", "sirawan@usc.edu", "nosleep");
    request(options, function(err, response, body) {
        console.log(body);
    });
    EventSchema.find({createdBy: "value1"}).exec(function(err, events){
    	var resp = {
    		body: {
    			events: [ ]
    		}
    	};
		events.forEach(function(element){
			resp.body.events.push({
				event: element.name,
				date: element.date, //TODO FIX THIS
				overview: "Check Status",
			});
		});
		res.json(resp);
	});
});


router.post('/dashboard', function(req,res,next) {
    EventSchema.save({
        createdBy: req.session.username,
        name: req.body.name,
        date: Date.now,
        recipients: req.body.recipients


    });



});


/* Should return all information related to user's trips and stuff */
/* This should include both trips organized and trips part of */
/* I guess it should also include relevant user information. */
/* So it can say "welcome melanie" */

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

module.exports = router;
