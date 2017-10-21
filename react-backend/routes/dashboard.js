var express = require('express');
var router = express.Router();
var passport = require('passport');
var EventSchema = require("../models/EventSchema");

router.get('/dashboard', function(req,res,next){
    return EventSchema.find({createdBy: req.session.username});


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
router.get('/', function(req, res, next) {

});

module.exports = router;
