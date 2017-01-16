const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer(); 

var config = require('./config');
	global.env = config.getEnv();
	global.jsonConfig = config.getConfig();

var host = jsonConfig.env.host;
var port = jsonConfig.env.port;
// globals
	global.baseFolder = 'start';
	global.baseUrl = 'http://' + host + ':' + port;
	
// bodyParser
	app.use(bodyParser.json());       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ extended: true }));  // to support URL-encoded bodies
	app.use(upload.array()); // for parsing multipart/form-data

// router
	var router = require(__dirname + '/router');
	app.use('/', router);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        if (config.getEnv() == "maintaining") {
        	res.render('site/maintaining', { title: 'Maintaining Site' });
        }
        else if (env == "development") {
        	res.render('error/page404', { title: 'Error Site', message: err.message });
        }
        else {
        	res.render('error/page404', { title: 'Error Site', message: "This is production environment" });
        }
    });

// Configuration, defaults to pug as the view engine
  	app.set('views', __dirname + '/views');
  	app.set('view engine', 'pug');

// set static
  	app.use(express.static(__dirname + '/public'));

// cookie
	var cookieParser = require('cookie-parser');
	app.use(cookieParser);

// session 
	var session = require('express-session');
	app.use(session({
		secret: "Shh, its a secret!", 
		resave: false, 
		saveUninitialized: true, 
		cookie: { secure: true }
	}));

// passport
	var passport = require('passport');
	app.use(passport.initialize());

// app start
	app.listen(port, host, function() {
		console.log('Started app.js');
	});

