var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    fs = require('fs'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var routes = require('./routes/index'),
    img = require('./routes/img'),
    category = require('./routes/category'),
    login = require('./routes/login'),
    admin = require('./routes/admin'),
    picUpload = require('./routes/picUpload'),
    app = express(),
    path_log = path.join(__dirname, 'logs/'),
    accessLogStream = '';

// check environment
if (!fs.existsSync(path_log)) {
  fs.mkdirSync(path_log);
}
accessLogStream = fs.createWriteStream(path.join(path_log, 'access.log'), { flags: 'a' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*300 //过期时间设置(单位毫秒)
	}
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(/\/(\d+)\/(\d+)/, img);
app.use(/\/(\d+)\/(\d+)\/(\w+)/, category);
app.use('/login', login);
app.use('/admin', admin);
app.use('/upload', picUpload);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;