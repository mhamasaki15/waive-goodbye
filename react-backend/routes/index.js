var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/UserSchema");
/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 console.log(req.session.passport.user);
});


router.get('/register', function(req, res) {
  // res.render('register', { });
});

router.post('/register', function(req, res) {
   User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
       if (err) {
        //   return res.render('register', { account : account });
       }

       passport.authenticate('local')(req, res, function () {
          // res.redirect('/');
       });
   });
});

router.get('/log', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/log', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
        console.log("success");
        //console.log(res.json().body());
        //console.log(const module = require('module');.body());
        console.log(req.session.passport.user);
        return res.status(200).end();
        //res.redirect('/dashboard');
});

router.get('/logout', function(req, res) {
   req.logout();
   //res.redirect('/');
});

router.get('/ping', function(req, res){
   //res.status(200).send("pong!");
});


module.exports = router;
