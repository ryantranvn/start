var express = require('express');
var router = express.Router();

/* require your controllers here */
	var siteController = require(__dirname + '/controllers/site');
// admin controllers
	var adminController = require(__dirname + '/controllers/admin');
	var adminAuthController = require(__dirname + '/controllers/admin/auth');

// main site routes
	router.route('/').get(siteController.index);

// admin routes
	router.route('/admin').get(adminController.index);

	router.route('/admin/login').get(adminAuthController.login);
	router.route('/admin/login').post(adminAuthController.loginSubmit);

//export this router to use in our index.js
module.exports = router;