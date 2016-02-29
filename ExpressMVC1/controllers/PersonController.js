"use strict";

var models = require('../models');

module.exports.controller = function(app){
	app.get('/api/people', function(req, res){	
		models.people.findAll({ order: 'id'}).then(function (people) {
			res.json(people);
		});
	});

	app.get('/api/people/:id', function(req, res){
		models.people.findOne({where: { id : req.params.id } }).then(function (person) {
			console.log(req.params.id);
			res.json(person);
		});
	});

	app.post('/api/people', function(req, res){
		var person = models.people.build(req.body.person);
		person.save();
		res.json(req.body.person);
	});
}