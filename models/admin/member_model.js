var db = require('../../models/db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// create Schema
var memberSchema = new Schema({
	username: String,
	password: String
});

var Members = mongoose.model('Members', memberSchema);

// init member collection
exports.memberCollection = function memberCollection() {
	return Members;
}

// find username
exports.findUsername = function findUsername(username, callback) {
	db.openConnection();
	Members.find({username: username}, function(err, response) {
		if(err) return true;
		callback(response)
	});
	db.closeConnection();
}

// login auth Member
exports.authMember = function authMember(username, password, callback) {
	db.openConnection();
		passport.use(new LocalStrategy( function(username, password, done) {
			Members.find({ username: username }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, true, { message: 'Incorrect password' });
				}
				return done(null, user);
			});
		}));
		callback();
	db.closeConnection();
}

// add a new member
exports.addNew = function addNew(json, callback) {
	db.openConnection();
	var count = Object.keys(json).length;
	json.forEach(function(element, index) {
		var collection = new Members({
			'username': element.username,
			'password': element.password
		});
		collection.save((err) => {
		    if (err) throw err;
		});
	    if(index === count-1) {
	        callback();
	    }
	})
	db.closeConnection();
}



