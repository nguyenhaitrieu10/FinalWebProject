var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var Cart = require('../models/cart');
var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  var products = Product.find({},'title imagePath',{limit: 8},function(err,docs){
  	res.render('shop/index', { title: 'Shopping cart',
  	products: docs,
    successMsg: successMsg
   });	
  });
});

router.get('/shopping', function(req, res, next) {
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

      console.log(pages);
      res.render('shop/shopping', {
        title: 'shopping',
        lists: tshirts, 
        count: result.length,
        pages: pages,
        isShopping: true,
        needPage: number
      });
    });
  });
});

router.get('/product/:_id', function(req, res, next) {
  let id = req.params._id;
  var products = Product.findOne({_id: id},function(err,tshirt){
    if (err)
      return res.redirect('/');

    let beforPrice = tshirt.saleoff?((tshirt.price / (1-tshirt.saleoff/100))>>0):(tshirt.price);
    res.render('shop/product', { 
      title: tshirt.title,
      tshirt: tshirt,
      beforPrice: beforPrice,
      isShopping: true,
      id: id
   });  
  });
});

router.get('/add-to-cart/:id',function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart?req.session.cart:{});

  Product.findById(productId, function(err, product){
    if (err){
      return res.redirect('/');
    }
    cart.add(product,productId);
    req.session.cart = cart;
    res.redirect('/shopping');
  });
});

router.get('/reduce/:id',function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart?req.session.cart:{});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/increase/:id',function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart?req.session.cart:{});

  cart.increaseByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id',function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart?req.session.cart:{});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart',function(req, res, next){
  if (!req.session.cart)
    return res.render('shop/shopping-cart',{products: [], isCart: true,title: 'Shopping Cart' });
  let cart = new Cart(req.session.cart);

  res.render('shop/shopping-cart',{
    products: cart.generateArray(),
    title: 'Shopping Cart', 
    isCart: true,
    totalPrice: cart.totalPrice
  });
});

router.get('/checkout', isLoggedIn, function(req, res, nex){
  if (!req.session.cart){
    return res.redirect('shopping-cart');
  }

  let cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout',{total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLoggedIn, function(req, res , next){
  if (!req.session.cart){
      return res.redirect('shopping-cart');
    }

  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_J3AUFdU7L20WlAvCwcl8LeNb");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, 
    description: "Test Charge"
  }, function(err, charge) {
    // asynchronously called
    if (err){
      req.flash('error',err.message);
      return res.redirect('/checkout');
    }

    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });

    order.save(function(err, result){
      req.flash('success','Successfully bought product');
      req.session.cart = null;
      res.redirect('/');
    });

    
  });
});

router.get('/design', function(req, res, next) {
    res.render('shop/design', { 
      title: 'Design Page',
  });
});
  // title: {type: String, require: true},
  // imagePath: {type: String, require: true},
  // description: {type: String, require: true},
  // price: {type: Number, require: true},
  // type: {type: String, require: true}, //polo or tee
  // origin: {type: String, require: true},
  // saleoff: {type: Number, require: true},
  // color: {type: String, require: true},
  // number: {type: Number, require: true},
  // update: {type: Date, default: new Date()},
  // madeBy: {type: Schema.Types.ObjectId, ref: 'User', require: false},

router.post('/add-design', function(req, res, next) {
  let path = req.body.path;

  var product = new Product({
    title: 'Áo đặt bởi ' + (req.user?req.user.name:""),
    imagePath: path,
    description: 'Áo tự thiết kế',
    price: 50,
    type: 'tee',
    origin: 'FreeStyle',
    saleoff: 0,
    color: 'white',
    number: 30,
    madeBy: req.user
  });

  product.save(function(err, result){
    res.redirect('/product/' + result._id);
  });
});
    // var order = new Order({
    //   user: req.user,
    //   cart: cart,
    //   address: req.body.address,
    //   name: req.body.name,
    //   paymentId: charge.id
    // });

    // order.save(function(err, result){
    //   req.flash('success','Successfully bought product');
    //   req.session.cart = null;
    //   res.redirect('/');
    // });

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }

  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
