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

router.get('/users', isAdminLoggedIn, function(req, res, next){
	User.find({role: null},function(err, users){
		if (err)
			return res.write('error');
		
		res.render('admin/users',{
			layout: 'admin-layout',
			users: users,
			numUsers: users.length
		});	
	});
	
});

router.get('/products', isAdminLoggedIn, function(req, res, next){
  let query = {};
  let sort = {update: -1};
  let page = 1;
  let keywords = "";

  if (req.query.type != undefined)
    query.type = req.query.type;
  if (req.query.color != undefined)
    query.color = req.query.color;
  if (req.query.page != undefined)
    page = req.query.page;
  if (req.query.search != undefined)
    keywords = req.query.search;
  if (req.query.sort != undefined){ 
    if (req.query.sort == 'lowest')
      sort = {price: 1};
    else if (req.query.sort == 'highest')
      sort = {price: -1};
    else if (req.query.sort == 'newst')
      sort = {update: -1};
  }


  let limit = 12;
  let skip = (page-1)*limit;
  if (keywords)
    query.$text = { $search : keywords };

  Product.find(query,"_id",null,function(err,result){
    if (err){
      return res.write('Error');
    }
    let number = result?(((result.length/limit)<<0) + (result.length%limit==0?0:1)):0;

    console.log(number);
    Product.find(query, null, {limit: limit, sort: sort, skip: skip}, function(err, tshirts){
      let pages = [];
      for (let i = 0; i < number; ++i){
        pages.push({number: i+1});
      }
      if (pages[page-1])
        pages[page-1].active = true;

      console.log(pages);
      res.render('admin/products', {
		layout: 'admin-layout',
        title: 'warehouse',
        lists: tshirts, 
        count: result.length,
        pages: pages,
        isShopping: true,
        needPage: number
      });
    });
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
