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
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders: orders });
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
	res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, title: '	Sign Up'});
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
	if (req.isAuthenticated()){
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
