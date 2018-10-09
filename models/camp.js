var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



var CampSchema = mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  sponsor: {
      name : {
        type : String
      },
      number : {
        type : String
      }
  },
  date: {
    type: String
  },
  time: {
    type: String
  }
});

var Camp = module.exports = mongoose.model('Camp', CampSchema);

module.exports.createCamp = function(newCamp, callback){
    newCamp.save(callback);
}

// module.exports.findEvents = function(newCamp, callback){
//   newCamp.find({}).toArray(callback);
// }

// module.exports.getDonorByUsername = function(mail, callback){
//   var query = {'mail':mail};
//   Donor.findOne(query, callback);
// }
//
// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// }
