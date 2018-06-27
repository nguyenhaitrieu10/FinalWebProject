var passport = require('passport');
var User = require('../models/user');
var Admin = require('../models/admin');
var localStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done){
	done(null,user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});
    
passport.use('local.signup', new localStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true									
}, function(req, email, password, done){
	req.checkBody('email','Invalid email').notEmpty().isEmail();
	req.checkBody('password','Invalid password').notEmpty().isLength({min: 6});
	req.checkBody('name','Invalid name').notEmpty();
	req.checkBody('address','Invalid adress').notEmpty();
	req.checkBody('phone','Invalid phone').notEmpty().isLength({min: 8});
	req.checkBody('birth','Invalid birth').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error',messages));
	}

	User.findOne({'email': email}, function(err, user){
		if (err)
			return done(err);
		if (user)
			return done(null,false,{message: "Email is already in use"});
		var newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err, res){
			if (err)
				return done(err);
			return done(err,newUser);
		});

		newUser.name = req.body.name;
		newUser.address = req.body.address;
		newUser.phone = req.body.phone;
		newUser.birth = req.body.birth;
		newUser.status = true;
	});
}));



passport.use('local.signin', new localStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	req.checkBody('email','Invalid email').notEmpty().isEmail();
	req.checkBody('password','Invalid password').notEmpty().isLength({min: 6});
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error',messages));
	}

	User.findOne({'email': email}, function(err, user){
		if (err)
			return done(err);
		if (!user)
			return done(null,false,{message: "No user found"});
		if (!user.validPassword(password)){
			return done(null,false,{message: 'Wrong Password'});
		}
		return done(null,user);
	});
}));
