var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressHsb = require('express-handlebars');
var indexRouter = require('./routes/index'); // Router
var userRouter = require('./routes/user'); // Router
var mongoose = require('mongoose');
var session = require('express-session');
var passport = 	require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var paginateHelper = require('express-handlebars-paginate');
var MongoStore = require('connect-mongo')(session);

var app = express();


mongoose.connect('mongodb://localhost:27017/shopping');
require('./config/passport');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
	
// view engine setup
app.engine('hbs',expressHsb({
  defaultLayout: 'layout',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  let user = req.user?(req.user.name.split(' ')):"";
  res.locals.username =  user?user[user.length-1]:"";
  next();
});

app.use('/user',userRouter); // set Router for user family
app.use('/', indexRouter); // set Router for index family

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('other/error');
});



app.listen(3000, function(){
	console.log('Server is listening on port 3000');
});
module.exports = app;
