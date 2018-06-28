var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
passport = require('passport'); 
var flash = require('connect-flash');
var request = require('request');

var csrfProtection = csrf();
router.use(csrfProtection);

var Order = require('../models/order');
var Cart = require('../models/cart');
var User = require('../models/user');

router.get('/orders', isLoggedIn, function(req, res, nex){
	Order.find({user: req.user}, null, {sort: {update: -1}},function(err, orders){
		if (err){
			return res.write('Error');
		}
		var cart;
		orders.forEach(function(order){
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('user/orders', {orders: orders});
	});
});


router.get('/profile', isLoggedIn, function (req, res, next) {
	var messages = req.flash('error');
    User.findOne({_id: req.user._id}, function(err, user) {
        if (err) {
            return res.write('Error!');
        }

        res.render('user/profile', { 
			csrfToken: req.csrfToken(), 
			messages: messages, 
        	title: 'User Infomation',
        	user: user
        });
    });
});


router.post('/profile', isLoggedIn, function (req, res, next) {
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
		req.flash('error',messages)
		return res.redirect('/');
	}

	let update = {};
	update.name = req.body.name;
	update.address = req.body.address;
	update.phone = req.body.phone;
	update.birth = req.body.birth;

    User.updateOne({_id: req.user._id}, update,function(err, user) {
        if (err) {
            return res.write('Error!');
        }
        req.flash('success','Successfully update information');
    	res.redirect('/');
    });
});

router.get('/password', isLoggedIn, function (req, res, next) {
	var messages = req.flash('error');

    res.render('user/password', { 
		csrfToken: req.csrfToken(), 
		messages: messages,
		hasErrors:  messages.length > 0,
    	title: 'User Change Password',
    });
});

router.post('/password', isLoggedIn, function (req, res, next) {
	req.checkBody('old','Invalid password').notEmpty().isLength({min: 6});
	req.checkBody('new','Invalid password').notEmpty().isLength({min: 6});
	req.checkBody('renew','Invalid password').notEmpty().isLength({min: 6});

	var errors = req.validationErrors();
	var messages = [];
	if (errors) {
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		req.flash('error',messages)
		return res.redirect('/');
	}

	let newPassword = req.body.new;
	let oldPassword = req.body.old;

    User.findOne({_id: req.user._id},function(err, user) {
        if (err) {
            return res.write('Error!');
        }
        if (!user.validPassword(oldPassword)){
        	messages.push('Wrong password');
			req.flash('error',messages)
    		return res.redirect('/user/password');
        }

        user.password = user.encryptPassword(newPassword);
        user.save(function(err, result){
			if (err)
				return res.write('error');
			req.flash('success','Successfully update information');
    		return res.redirect('/');
		});
    });
});

router.get('/logout', isLoggedIn, function(req, res, next){
	req.logout();
	res.redirect('/');
});


router.use('/',notLoggedIn, function(req, res, next){
	next();
});

router.get('/signup', function(req, res, next){
	var messages = req.flash('error');
	res.render('user/signup',{
		csrfToken: req.csrfToken(), 
		messages: messages, 
		hasErrors: messages.length > 0, 
		title: 'Sign Up'});
});


router.post('/signup', checkCaptcha, passport.authenticate('local.signup',{
	failureRedirect: '/user/signup',
	failureFlash: true
}), function(req, res, next){
	if (req.session.oldUrl){
			var oldUrl = req.session.oldUrl;
			req.session.oldUrl = null;
			res.redirect(oldUrl);
	} else {
			res.redirect('/user/profile');
	}	
});


router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
	res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


router.post('/signin', passport.authenticate('local.signin',{
	failureRedirect: '/user/signin',	
	failureFlash: true
}), function(req, res, next){
	if (req.session.oldUrl){
		var oldUrl = req.session.oldUrl;
		req.session.oldUrl = null;
		res.redirect(oldUrl);
	} else {
		res.redirect('/user/profile');
	}
});

function checkCaptcha(req, res, next){
  req.body.captcha = req.body['g-recaptcha-response'];	
  if(
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ){
  	messages = ['Please select captcha'];
	return res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: 'Sign Up'});
  }

  const secretKey = '6LdpvDEUAAAAAHszsgB_nnal29BIKDsxwAqEbZzU';

  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body);

    if(body.success !== undefined && !body.success){
    	messages = ['Failed captcha verification'];
		return res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: 'Sign Up'});
    }

    //If Successful
    return next();
  });
}

function isLoggedIn(req, res, next){
	if (req.isAuthenticated() && req.user && req.user.status){
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req, res, next){
	if (!req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = router;
