var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');
var Donor = require('../models/donor');
var Camp = require('../models/camp');

var mongoose = require('mongoose');
mongoose.connect('mongodb://Sarangan:saru0528-@ds125273.mlab.com:25273/donorslk');
var db = mongoose.connection;
var ObjectID = require('mongodb').ObjectID;

router.get('/admin', function(req, res){
  res.render('admin');
});

router.post('/adminlogin', function(req, res){
  console.log("varuthhhu");
  Admin.getAdminbymail(req.body.mail, (err, admin)=> {
    if(err) throw err;
    if(admin){
      res.redirect('/admins/hma');
    }
    else {
      console.log("Admin not found");
    }
  })
});

router.get('/searchres', (req, res)=>{
  res.render('bloodsearch');
})

router.get('/create', (req, res)=>{
  res.render('creator');
})

router.get('/hma', (req, res)=>{
  res.render('homeadmin');
});

router.post('/adminception', (req, res)=>{
  var newAdmin = new Admin();

  newAdmin.mail = req.body.mail;
  newAdmin.password = req.body.password;

  Admin.createAdmin(newAdmin, (err, admin) => {
    if(err) throw err;
    console.log(admin);
  });
  res.redirect('/admins/admin');
});

router.post('/addcamp', (req, res)=>{
  var newCamp = new Camp();

  newCamp.name = req.body.campName;
  newCamp.address = req.body.campAddress;
  newCamp.sponsor.name = req.body.sponname;
  newCamp.sponsor.number = req.body.sponnumber;
  newCamp.date = req.body.spondate;
  newCamp.time = req.body.spontime;

  Camp.createCamp(newCamp, (err, camp)=>{
    if(err) throw err;
  });
  res.redirect('/admins/hma');
})

router.get('/getallcamps', (req, res)=>{
  db.collection('camps').find({}).toArray((err, camp)=>{
    if(err) throw err;
    if(!camp){
      console.log("no camps details avaialble");
    }
    else{
      res.send(camp);
    }
  });
})

router.get('/viewcamps', (req, res)=>{
  res.render('viewcamp');
});

router.put('/updatecamps/:id', (req, res)=>{
  var id = req.params.id;

  var name = req.body.name;
  var address = req.body.address;
  var sponsor_name = req.body.sponsor_name;
  var sponsor_numb = req.body.sponsor_numb;
  var date = req.body.spondate;
  var time = req.body.spontime;


  const clog = { '_id': new ObjectID(id) };
  console.log("this +" + id);

  const changes = { 'name' : name, 'address' : address, 'sponsor.name' : sponsor_name, 'sponsor.number' : sponsor_numb, 'date' : date, 'time' : time };
  Camp.update(clog, changes, (err, result) => {
    if (err) {
      throw err;
      // res.send({'error':'An error has occurred'});
    } else {
      res.send(result);
    }
  });
});

router.get('/getblood/:key', (req, res)=>{
  db.collection('donors').find({  'bloodgroup' : req.params.key }).toArray((err, donor)=>{
    if(err) throw err;
    if(!donor){
      console.log("no camps details avaialble");
    }
    else{
      res.send(donor);
    }
  });
})
module.exports = router;
