"use strict";

var models = require('../models');

module.exports.controller = function(app){
	var viewParams = {}
	app.get('/', function(req, res){
		models.people.findOne().then(function (person) {
	  		viewParams.person = person;

			res.render('home/index',viewParams);
		});
	});
}