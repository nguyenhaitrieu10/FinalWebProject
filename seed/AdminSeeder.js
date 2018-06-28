var Admin = require('../models/user.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var admins = [
	new Admin({
		email: "admin123123@gmail.com",
		password: 'rootadmin',
		name: 'admin',
		role: 'admin',
		status: true
	})
];

var done = 0;
for (var i = 0; i < admins.length; ++i){
	admins[i].password = admins[i].encryptPassword(admins[i].password);
	admins[i].save(function(err, res){
		done++;
		if (done === admins.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}
