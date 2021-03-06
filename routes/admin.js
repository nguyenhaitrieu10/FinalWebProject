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
	let polo = [];
	let tee = [];
	let from = new Date('2018-01-01');
	let to = new Date();
	let query = {};
	let hasPolo = true;
	if (req.query.type !== undefined){
    	hasPolo = (req.query.type == 'polo')?true:false;
	}

	if (req.query.from !== undefined){
    	from = new Date(req.query.from);
	}
	if (req.query.to !== undefined){
    	to = new Date(req.query.to);
	}

  	var messages = req.flash('error');
  	let range = (((to - from) / 3600000 / 24)<<0);
  	if (range < 0)
  		return req.redirect('admin/index');

  	let bin = (range / 11)<<0;

	User.count({},function(err, cUser){
  		if (err)
  			return res.write(error);
  		Product.count({},function(err, cProduct){
	  		if (err)
	  			return res.write(error);
	  		Order.find(query,"update cart",null,function(err, orders){
		  		if (err)
		  			return res.write(error);
		  		var cOrder = orders.length;
		  		var month = [0,0,0,0,0,0,0,0,0,0,0,0];
		  		for (let i in orders){
		  			if (orders[i].update >= from && orders[i].update <= to)
		  				month[(((((orders[i].update - from) / 3600000 / 24)<<0)/bin)<<0)] +=(orders[i].cart?orders[i].cart.totalPrice:0);
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
						statistic: month,
						hasPolo: hasPolo,
					});
		  		});
		  	});
  		});
  	});
});

router.post('/ban/:id', isAdminLoggedIn, function(req, res, next){
	let id = req.params.id;
	User.findOne({_id: id}, function(err, user){
		if (err){
			return res.redirect('/admin/users');
		}
		user.status = false;
		user.save(function(err, result){
			if (err)
				return res.write('error');
    		return res.redirect('/admin/users');
		});
	});
});


router.post('/deban/:id', isAdminLoggedIn, function(req, res, next){
	let id = req.params.id;
	User.findOne({_id: id}, function(err, user){
		if (err){
			return res.redirect('/admin/users');
		}
		user.status = true;
		user.save(function(err, result){
			if (err)
				return res.write('error');
    		return res.redirect('/admin/users');
		});
	});
});


router.get('/orders', isAdminLoggedIn, function(req, res, next){
  	let query = {status: 'wait'};
	let sort = {update: -1};
	let page = 1;

	if (req.query.status != undefined)
	   query.status = req.query.status;
	if (req.query.page != undefined)
    	page = req.query.page;
	if (req.query.sort != undefined){ 
	    if (req.query.sort == 'lowest')
	      sort = {price: 1};
	    else if (req.query.sort == 'highest')
	      sort = {price: -1};
	    else if (req.query.sort == 'newst')
	      sort = {update: -1};
	}

	let limit = 6;
	let skip = (page-1)*limit;

	Order.find(query,"_id",null,function(err,result){
		if (err)
			return res.write('error');
    	let number = result?(((result.length/limit)<<0) + (result.length%limit==0?0:1)):0;
		Order.find(query, null, {limit: limit, sort: sort, skip: skip}, function(err, orders){
	      let pages = [];
	      for (let i = 0; i < number; ++i){
	        pages.push({number: i+1});
	      }
	      if (pages[page-1])
	        pages[page-1].active = true;

	      res.render('admin/orders', {
			layout: 'admin-layout',
	        title: 'orders',
	        orders: orders, 
	        numOrder: result.length,
	        pages: pages,
	        isWait: (query.status == 'wait'),
	        needPage: number
	      });
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

    Product.find(query, null, {limit: limit, sort: sort, skip: skip}, function(err, tshirts){
      let pages = [];
      for (let i = 0; i < number; ++i){
        pages.push({number: i+1});
      }
      if (pages[page-1])
        pages[page-1].active = true;

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

router.get('/order-detail/:id', isAdminLoggedIn, function(req, res, next){
	let id = req.params.id;
	console.log(id);
	Order.findOne({_id: id},function(err, order){
		if (err)
			return res.write('error');
		
		res.render('admin/order-detail',{
			layout: 'admin-layout',
			cart: order.cart,
			_id: order._id,
			accepted: order.status !== 'shipping'
		});	
	});
});

router.get('/order-shipping/:id', isAdminLoggedIn, function(req, res, next){
	let id = req.params.id;
	console.log(id);
	Order.update({_id: id},{status: 'shipping'},function(err, order){
		if (err)
			return res.write('error');
		
		return res.redirect('/admin/orders');

	});
});

router.get('/users', isAdminLoggedIn, function(req, res, next){
	User.find({role: null},function(err, users){
		if (err)
			return res.write('error');
		
		res.render('admin/users',{
			layout: 'admin-layout',
			users: users,
			numUsers: users.length,
			csrfToken: req.csrfToken()
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
