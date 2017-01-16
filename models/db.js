var mongoose = require('mongoose');
var assert = require('assert');
var promise = require('bluebird');

mongoose.Promise = global.Promise;

exports.openConnection = function openConnection() {
	if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
		mongoose.connect(jsonConfig.db, function(err) {
			assert.equal(null, err);	
		});
	}
}

exports.closeConnection = function closeConnection() {
	if (mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2) {
		mongoose.connection.close();
	}
}