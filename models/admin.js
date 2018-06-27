var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bscrypt = require('bcrypt-nodejs');


var adminSchema = new Schema({
	email: {type: String, require: true},
	password: {type: String, require: true}
});

adminSchema.methods.encryptPassword = function(password){
	return bscrypt.hashSync(password,bscrypt.genSaltSync(5),null);
}

adminSchema.methods.validPassword = function(password){
	return bscrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Admin',adminSchema);
