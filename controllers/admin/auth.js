/* ADMIN */
/* ------------------------ */
var db = require('../../models/db');
// db
	var mongoose = require('mongoose');
	var members = require('../../models/admin/member_model');
	// var memberCollection = members.memberCollection();
var md5 = require('md5');


// site
module.exports = {
	login : function(req, res){
    	res.render('admin/login', { title: 'Auth Site' });
    },
    loginSubmit : function(req, res) { // submit form
		var refererURL = req.headers.referer;
		var username = req.body.username;
		var password = md5(req.body.password);
		members.authMember(username, password, function(resAuth) {
			console.log(resAuth)
		});
		
		// members.findUsername(username, function(resFind) {
		// 	if (resFind.length>0) {
		// 		console.log('checking');
		// 		// res.redirect(refererURL);
		// 		// members.authMember(username, password);
		// 	}
		// 	else {
				

		// 		// arrJson = [{'username': username, 'password': password}];
		// 		// members.addNew(arrJson, function() {
		// 		// 	res.redirect(baseUrl + '/admin');
		// 		// })
		// 		console.log('OK')
		// 	}
		// });
		
    }
}
