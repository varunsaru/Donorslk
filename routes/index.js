var express = require('express');
var router = express.Router();

var Admin = require('../models/admin');

//Get Homepage
router.get('/', function(req, res){
  res.render('index');
});
//shop
router.get('/shops', function (req, res) {
	res.render('shops');
});

// donations
router.get('/donations', function (req, res) {
	res.render('donations');
});
// contact_us
router.get('/contact', function (req, res) {
	res.render('contact');
});

// router.post('/adminception', (req, res)=>{
//   var newAdmin = new Admin();
//
//   newAdmin.mail = req.body.mail;
//   newAdmin.password = req.body.password;
//
//   Admin.createAdmin(newAdmin, (err, admin) => {
//     if(err) throw err;
//     console.log(admin);
//   });
//
//   res.redirect('/admin');
//
// });
 module.exports = router;
