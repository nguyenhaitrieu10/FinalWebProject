var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var Cart = require('../models/cart');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  var products = Product.find({},null,{limit: 4},function(err,docs){
  	res.render('shop/index', { title: 'Shopping cart',
  	products: docs,
    successMsg: successMsg
   });	
  });
});

router.get('/shopping', function(req, res, next) {
  let query = {};
  if (req.query.type != undefined)
    query.type = req.query.type;
  if (req.query.color != undefined)
    query.color = req.query.color;
  if (req.query.sort != undefined)
    query.sort = req.query.sort;
  if (req.query.skip != undefined)
    query.skip = req.query.skip;
  
  query.limit = 12;
  query.skip = 1;
  Product.find(function(err, tshirts){
    console.log(tshirts);
    res.render('shop/shopping',{lists: tshirts, count: tshirts.length});
  });
});

// router.get('/add-to-cart/:id',function(req, res, next){
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart?req.session.cart:{});

//   Product.findById(productId, function(err, product){
//     if (err){
//       return res.redirect('/');
//     }
//     cart.add(product,productId);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect('/');
//   });

// });

// router.get('/reduce/:id',function(req, res, next){
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart?req.session.cart:{});

//   cart.reduceByOne(productId);
//   req.session.cart = cart;
//   res.redirect('/shopping-cart');
// });

// router.get('/remove/:id',function(req, res, next){
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart?req.session.cart:{});

//   cart.removeItem(productId);
//   req.session.cart = cart;
//   res.redirect('/shopping-cart');
// });

// router.get('/shopping-cart',function(req, res, next){
//   if (!req.session.cart)
//     return res.render('shop/shopping-cart',{products: {}});
//   let cart = new Cart(req.session.cart);
//   res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice});
// });

// router.get('/checkout', isLoggedIn, function(req, res, nex){
//   if (!req.session.cart){
//     return res.redirect('shopping-cart');
//   }

//   let cart = new Cart(req.session.cart);
//   var errMsg = req.flash('error')[0];
//   res.render('shop/checkout',{total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
// });

// router.post('/checkout',isLoggedIn, function(req, res , next){
//   if (!req.session.cart){
//       return res.redirect('shopping-cart');
//     }

//   var cart = new Cart(req.session.cart);
//   var stripe = require("stripe")("sk_test_J3AUFdÙ7L0WlAvCwcl8LeNb");

//   stripe.charges.create({
//     amount: cart.totalPrice * 100000,
//     currency: "usd",
//     source: req.body.stripeToken, 
//     description: "Test Charge"
//   }, function(err, charge) {
//     // asynchronously called
//     if (err){
//       req.flash('error',err.message);
//       return res.redirect('/checkout');
//     }

//     var order = new Order({
//       user: req.user,
//       cart: cart,
//       address: req.body.address,
//       name: req.body.name,
//       paymentId: charge.id
//     });

//     order.save(function(err, result){
//       req.flash('success','Successfully bought product');
//       req.session.cart = null;
//       res.redirect('/');
//     });

    
//   });
// });

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }

  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
