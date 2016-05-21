/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var cat = require('../models/cat.js');

router.get('/', function(req,res) {
	cat.all(function(data){
		var hbsObject = {
			cats : data,
			logged_in: req.session.logged_in
		}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/create', function(req,res) {
	cat.create(['name', 'sleepy', 'user_id'], [req.body.name, req.body.sleepy, req.session.user_id], function(data){
		res.redirect('/cats')
	});
});

router.put('/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	cat.update({'sleepy' : req.body.sleepy}, condition, function(data){
		res.redirect('/cats');
	});
});

router.delete('/delete/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	cat.delete(condition, function(data){
		res.redirect('/cats');
	});
});

module.exports = router;
