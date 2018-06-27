var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
passport = require('passport'); 
var flash = require('connect-flash');

var csrfProtection = csrf();
router.use(csrfProtection);

var Order = require('../models/order');
var Cart = require('../models/cart');
var Admin = require('../models/admin');
var User = require('../models/user');

router.use('/', function(req, res, next){
	next();
});

router.get('/logout', isAdminLoggedIn, function(req, res, next){
	req.logout();
	res.redirect('/admin/signin');
});

router.get('/index', isAdminLoggedIn, function(req, res, next){
  	var messages = req.flash('error');
  	User.count({},function(err, cUser){
  		if (err)
  			return res.write(error);
  		Product.count({},function(err, cProduct){
	  		if (err)
	  			return res.write(error);
	  		Order.find({},"update cart",null,function(err, orders){
		  		if (err)
		  			return res.write(error);
		  		var cOrder = orders.length;
		  		var month = [0,0,0,0,0,0,0,0,0,0,0,0];
		  		let curYear = (new Date()).getYear();
		  		for (let i in orders){
		  			if (orders[i].update.getYear() == curYear){
		  				month[orders[i].update.getMonth()]+=(orders[i].cart.totalPrice);
		  			}
		  		}
		  		// month = [65,59,90,81,56,55,40,65,59,90,81,56];
		  		Order.find({},null, {limit: 4, sort: {update: -1}},function(err, lastesOrder){
			  		if (err)
			  			return res.write(error);

			  		res.render('admin/index',{
						layout: 'admin-layout',
						csrfToken: req.csrfToken(),
						messages: messages,
						hasErrors: messages.length > 0,
						numUser: cUser,
						numOrder: cOrder,
						numProduct: cProduct,
						orders: lastesOrder,
						statistic: month
					});
		  		});
	  		});
  		});
  	});
});

router.get('/orders', isAdminLoggedIn, function(req, res, next){
	res.render('admin/orders',{
		layout: 'admin-layout'
	});
});

router.use('/',notLoggedIn, function(req, res, next){
	next();
});

router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
	res.render('admin/signin',{
		layout: null, 
		csrfToken: req.csrfToken(), 
		messages: messages, 
		hasErrors: messages.length > 0
	});
});	


router.post('/signin', passport.authenticate('local.signin',{
	failureRedirect: '/admin/signin',	
	failureFlash: true
}), function(req, res, next){
	res.redirect('/admin/index');
});


function isAdminLoggedIn(req, res, next){
	if (req.isAuthenticated() && req.user && req.user.role == 'admin'){
		return next();
	}
	res.redirect('/admin/signin');
}

function notLoggedIn(req, res, next){
	if (!req.isAuthenticated()){
		return next();
	}
	res.redirect('/admin/index');
}

module.exports = router;
