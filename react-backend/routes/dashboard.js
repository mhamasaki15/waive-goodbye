var express = require('express');
var router = express.Router();
var passport = require('passport');
var EventSchema = require("../models/EventSchema");

router.get('/', function(req,res,next){
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



module.exports = router;
