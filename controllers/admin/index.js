/* ADMIN */
/* ------------------------ */
var db = require('../../models/db');
// var session = require('express-session');

// db
	var mongoose = require('mongoose');
	var members = require('../../models/admin/member_model');
	var memberCollection = members.memberCollection();

module.exports = {
	index : function(req, res, next) {
       	res.render('admin/home', { title: 'Admin Site' });
    }
}