var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Donor = require('../models/donor');


router.get('/register', function(req, res){
  res.render('register');
});

router.get('/login', function(req, res){
  res.render('login');
});
//Get Homepage
router.post('/register', function(req, res){
  var fname = req.body.fullname;
  var user = req.body.username
  var email = req.body.mail;
  var addres = req.body.address;
  var ag = req.body.age;
  var blood = req.body.bloodgroup;
  var dat = req.body.date;
  var cit = req.body.city;
  var phone = req.body.phonenumber;
  var pass = req.body.password;
  var pass2 = req.body.password2;
  var dise = req.body.diseas;
  var alce = req.body.alc;
  //validation
  req.checkBody('fullname', 'Name is required').notEmpty();
  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('mail', 'Email is required').notEmpty();
  req.checkBody('mail', 'Email is valid').isEmail();
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('date', 'Date is required').notEmpty();
  req.checkBody('city', 'City is required').notEmpty();
  req.checkBody('phonenumber', 'PhoneNumber is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('diseas', 'Diseas is required').notEmpty();
  var errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else{
    var newDonor = new Donor({
      fullname: fname,
      username: user,
      mail: email,
      address: addres,
      age: ag,
      bloodgroup: blood,
      dateofbirth: dat,
      city: cit,
      phonenumber: phone,
      password: pass,
      diseas: dise,
      alc: alce
    });

    Donor.createDonor(newDonor, function(err, donor){
      if(err) throw err;
      console.log(donor);
    });
    req.flash('success_msg', 'You Can Login Now');

    res.redirect('/donors/login');
  }
});

passport.use(new LocalStrategy(
  function(mail, password, done) {
    Donor.getDonorByUsername(mail, function(err, donor){
      if(err) throw err;
      if(!donor){
        return done(null, false, {message: 'Unknown Email'});
      }

      Donor.comparePassword(password, donor.password,  function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, donor);
        } else{
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }));


  passport.serializeUser(function(donor, done) {
    done(null, donor.id);
  });

  passport.deserializeUser(function(id, done) {
    Donor.getUserById(id, function(err, donor) {
      done(err, donor);
    });
  });

  router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/donors/login', failureFlash:true}),
  function(req, res) {
    res.redirect('/');
  });

  router.get('/logout', function (req, res) {
  	req.logout();

  	req.flash('success_msg', 'You are logged out');

  	res.redirect('/users/login');
  });
// //Admin
// router.get('/admin', function(req, res){
//   res.render('admin');
// });



module.exports = router;
