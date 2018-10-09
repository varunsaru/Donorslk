var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Admin Schema
var AdminSchema = mongoose.Schema({
	password: {
		type: String
	},
	mail: {
		type: String
	}
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = (newAdmin, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.mail, salt, (err, hash)=>{
      newAdmin.password = hash;
      newAdmin.save(callback);
    });
  });
}


module.exports.getAdminbymail = (mail, callback)=>{
	var query = {'mail' : mail};
	Admin.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
