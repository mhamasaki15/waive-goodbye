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




module.exports = router;
