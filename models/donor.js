var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



var DonorSchema = mongoose.Schema({

  fullname: {
    type: String,
    index:true
  },
  username: {
    type: String,
  },
  mail: {
    type: String
  },
  address: {
    type: String
  },
  age: {
    type: String
  },
  bloodgroup: {
    type: String
  },
  dateofbirth: {
    type: String
  },
  city: {
    type: String
  },
  phonenumber : {
    type: String
  },
  password: {
    type: String
  },
  diseas: {
    type: String
  },
  alc: {
    type: Boolean
  }

});

var Donor = module.exports = mongoose.model('Donor', DonorSchema);

module.exports.createDonor = function(newDonor, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newDonor.password, salt, function(err, hash) {
      newDonor.password = hash;
      newDonor.save(callback)
    });
  });
}

module.exports.getDonorByUsername = function(mail, callback){
  var query = {'mail':mail};
  Donor.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}
