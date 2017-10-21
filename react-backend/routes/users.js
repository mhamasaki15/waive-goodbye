var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET users listing. */
router.get('/', function(req, res, next) {
//  res.send('respond with a resource');


    // var transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'waive.goodbye@gmail.com', // Your email id
    //         pass: 'sdhacks2017' // Your password
    //     }
    // });
    // var text = "u suck test.txt";

    // var mailOptions = {
    // 	from: 'waive.goodbye@gmail.com',
    // 	to: 'ramosaj@usc.edu',
    // 	subject: 'go away',
    // 	text: text
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    // 	if (error){
    // 		console.log(error);
    // 		res.json({yo: 'error'})
    // 	}
    // 	else{
    // 		console.log('message: sent');
    // 		res.json({yo: info.response});
    // 	}
    // });

	res.json([{
		id: 1,
		username: "mhamasaki15"
	}, {
		id: 2,
		username: "staceyirawan"
	}]);

});

module.exports = router;
