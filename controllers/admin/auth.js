/* ADMIN */
/* ------------------------ */
var db = require('../../models/db');
// db
	var mongoose = require('mongoose');
	var members = require('../../models/admin/member_model');
var md5 = require('md5');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// site
module.exports = {
	login : function(req, res){
    	res.render('admin/login', { title: 'Auth Site' });
    },
    loginSubmit : function(req, res) { // submit form
		var refererURL = req.headers.referer;
		var username = req.body.username;
		var password = md5(req.body.password);
		
		members.authMember(username, password, function() {
			console.log('HERE')
		});
		
		
    }
}
