var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var docusign = require('docusign-esign');
var async = require('async');
var fs = require('fs');
var request = require('request');

var 	email = "sirawan@usc.edu",				// your account email
    	password = "nosleep",			// your account password
    	integratorKey = "fa2dce99-1a16-48f4-b63d-603edbfb3f13",			// your Integrator Key (found on the Preferences -> API page)
		recipientName = "Melanie Hamasaki"
        recipientEmail= "sirawan@usc.edu",			// recipient (signer) name
    	documentName = "pdfs/document.pdf",
        docusignEnv='demo',		// copy document with this name into same directory!
    	baseUrl = 'https://' + docusignEnv + '.docusign.net/restapi',
        paymentGatewayId="86b77b1a-d470-424e-aa9c-d91d573b6a70";

router.get('/organizer/payment', function(req, res, next) {
        async.waterfall(
        [
          /////////////////////////////////////////////////////////////////////////////////////
          // Step 1: Login (used to retrieve your accountId and account baseUrl)
          /////////////////////////////////////////////////////////////////////////////////////

          function login(next) {

            // initialize the api client
            var apiClient = new docusign.ApiClient();
            apiClient.setBasePath(baseUrl);

            // create JSON formatted auth header
            var creds = JSON.stringify({
              Username: email,
              Password: password,
              IntegratorKey: integratorKey
            });
            apiClient.addDefaultHeader('X-DocuSign-Authentication', creds);

            // assign api client to the Configuration object
            docusign.Configuration.default.setDefaultApiClient(apiClient);

            // login call available off the AuthenticationApi
            var authApi = new docusign.AuthenticationApi();

            // login has some optional parameters we can set
            var loginOps = {};
            loginOps.apiPassword = 'true';
            loginOps.includeAccountIdGuid = 'true';
            authApi.login(loginOps, function (err, loginInfo, response) {
              if (err) {
                console.error(err.response ? err.response.error : err);
                return;
              }
              if (loginInfo) {
                // list of user account(s)
                // note that a given user may be a member of multiple accounts
                var loginAccounts = loginInfo.loginAccounts;
                console.log('LoginInformation: ' + JSON.stringify(loginAccounts));
                next(null, loginAccounts);
              }
            });
          },

function requestPayment(loginAccounts, next){

    console.log('Requesting payment');

    // create a byte array that will hold our document bytes
    var fileBytes = null;
    var fileToSign = "pdfs/document.pdf";
    try {
      // read file from a local directory
      fileBytes = fs.readFileSync(fileToSign);
    } catch (ex) {
      // handle error
      console.log('Exception: ' + ex);
      return;
    }

    console.log('Got file');

    // create an envelope to be signed
    var envDef = new docusign.EnvelopeDefinition();
    envDef.emailSubject = 'Please Pay in my Node SDK Envelope';
    envDef.emailBlurb = 'Hello, Please pay in my Node SDK Envelope.';

    // add a document to the envelope
    var doc = new docusign.Document();
    var base64Doc = new Buffer(fileBytes).toString('base64');
    doc.documentBase64 = base64Doc;
    doc.name = "pdfs/document.pdf"
    doc.documentId = '1';

    var docs = [];
    docs.push(doc);
    envDef.documents = docs;

    // Add a recipient to sign the document
    var signer = new docusign.Signer();
    signer.email = recipientEmail;
    signer.name = recipientName;
    signer.recipientId = '1';

    // create a signHere tab somewhere on the document for the signer to sign
    // - a SignHere Tab is ---NOT--- required for payments!
    var signHere = new docusign.SignHere();
    signHere.documentId = '1';
    signHere.pageNumber = '1';
    signHere.recipientId = '1';
    signHere.xPosition = '100';
    signHere.yPosition = '200';


    // Create the NumberTab to hold the payment information
    var numberTab = new docusign.ModelNumber();
    numberTab.documentId = '1';
    numberTab.pageNumber = '1';
    numberTab.recipientId = '1';
    numberTab.xPosition = '100';
    numberTab.yPosition = '100';
    numberTab.tabLabel = 'tabvalue1';
    numberTab.value = '10.00';
    numberTab.locked = 'true';

    // FormulaTab with lineItems
    var formulaTab = new docusign.FormulaTab();
    formulaTab.required = 'true';
    formulaTab.documentId = '1';
    formulaTab.pageNumber = '1';
    formulaTab.recipientId = '1';
    formulaTab.xPosition = '1'; // placement doesnt really matter, it doesnt show up?
    formulaTab.yPosition = '1'; // placement doesnt really matter, it doesnt show up?
    formulaTab.tabLabel = 'tabpayment1';

    // formula-specific fields
    formulaTab.formula = '[tabvalue1] * 100';
    formulaTab.roundDecimalPlaces = '2';

    // payment-specific fields

    // Create LineItems
    // - this is what will show up on receipts, credit card statements, and in your Payment Gateway
    var lineItem = {};
    lineItem.name = 'Name1';
    lineItem.description = 'description1';
    lineItem.itemCode = 'ITEM1';
    lineItem.amountReference = 'tabvalue1';

    var lineItems = [];
    lineItems.push(lineItem);

    formulaTab.paymentDetails = {};
    formulaTab.paymentDetails.currencyCode = 'USD';
    formulaTab.paymentDetails.gatewayAccountId = paymentGatewayId;
    formulaTab.paymentDetails.lineItems = lineItems;


    // can have multiple tabs, so need to add to envelope as a single element list
    var formulaTabs = [];
    formulaTabs.push(formulaTab);

    var numberTabs = [];
    numberTabs.push(numberTab);

    var signHereTabs = [];
    signHereTabs.push(signHere);

    var tabs = new docusign.Tabs();
    tabs.formulaTabs = formulaTabs;
    tabs.numberTabs = numberTabs;
    tabs.signHereTabs = signHereTabs;
    signer.tabs = tabs;

    // Above causes issue
    envDef.recipients = new docusign.Recipients();
    envDef.recipients.signers = [];
    envDef.recipients.signers.push(signer);

    // send the envelope (otherwise it will be "created" in the Draft folder
    envDef.status = 'sent';

    // use the |accountId| we retrieved through the Login API to create the Envelope
    let loginAccount = loginAccounts[0];
    var accountId = loginAccount.accountId;

    // instantiate a new EnvelopesApi object
    var envelopesApi = new docusign.EnvelopesApi();

    // call the createEnvelope() API
    envelopesApi.createEnvelope(accountId, {'envelopeDefinition': envDef}, function (error, envelopeSummary, response) {
      if (error) {
        console.error('Error: ' + error);
        console.log(response);
        return;
      }

      if (envelopeSummary) {
        console.log('EnvelopeSummary: ' + JSON.stringify(envelopeSummary,null,2));
      }
  });

    }

  ]);
});


router.get('/organizer/checkEnvelopes',function(req,res) {
    var url = "https://demo.docusign.net/restapi/v2/accounts/3916189/envelopes?from_date=2017-10-21";
    var options = initializeRequest(url, "GET", "", "sirawan@usc.edu", "nosleep");
    request(options, function(err, response, body) {
            res.json(body);
    });


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



module.exports = router;
