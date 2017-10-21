var express = require('express');
var router = express.Router();

/* Should take trip id as parameter. Should authenticate that user is the user
who created trip, then send back information about trip. This is probably gonna 
be a HUGE get */
router.get('/organizer/summary', function(req, res, next) {

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

module.exports = router;
