var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bscrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
	email: {type: String, require: true},
	password: {type: String, require: true},
	address: {type: String, require: true},
	phone: {type: String, require: true},
	status: {type: Boolean, require: true},
	birth: {type: String, require: false},
	idCard: {type: String, require: false},
});

userSchema.methods.encryptPassword = function(password){
	return bscrypt.hashSync(password,bscrypt.genSaltSync(5),null);
}

userSchema.methods.validPassword = function(password){
	return bscrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',userSchema);
 
//  'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var User = sequelize.define('User', {
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     address: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     status: DataTypes.BOOLEAN,
//     birth: DataTypes.DATE,
//     idCard: DataTypes.INTEGER
//   }, {});
//   User.associate = function(models) {
//     // associations can be defined here
//   };
//   return User;
// };