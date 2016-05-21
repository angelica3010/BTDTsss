var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
var cat = require('../models/cat.js');
var user = require('../models/user.js');
var connection = require('../config/connection.js');

//this is the users_controller.js file
router.get('/profile/:id', function(req, res){

  var queryString = "select * from users "
  queryString += "left join cats on cats.user_id = users.id "
  queryString += "where users.id = " + req.params.id;
  console.log(queryString)
  connection.query(queryString, function(err, userAndCats) {
      if (err) throw err;

      //uncomment this to see what the data gets returned like
      //res.send(user)
      res.render('users/show', {userAndCats: userAndCats})

  });
});

router.get('/new', function(req,res) {
	res.render('users/new');
});

router.get('/sign-in', function(req,res) {
	res.render('users/sign_in');
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/login', function(req, res) {
	var email = req.body.email;

	var condition = "email = '" + email + "'";
	user.findOne(condition, function(users){
		if (users.length > 0){
			bcrypt.compare(req.body.password, users[0].password_hash, function(err, result) {
					if (result == true){

						req.session.logged_in = true;
						req.session.user_id = users[0].id;
						req.session.user_email = users[0].email;

						res.redirect('/cats');
					}
			});
		}else{
			res.send('an account with this email does not exist - please sign up')
		}
	});
});

router.post('/create', function(req,res) {
	var queryString = "select * from users where email = '" + req.body.email + "'";

	connection.query(queryString, function(err, users) {
			if (err) throw err;

			if (users.length > 0){
				console.log(users)
				res.send('we already have an email or username for this account')
			}else{

				bcrypt.genSalt(10, function(err, salt) {
						bcrypt.hash(req.body.password, salt, function(err, hash) {
              user.create(['username', 'email', 'password_hash'], [req.body.username, req.body.email, hash], function(data){

                req.session.logged_in = true;
                req.session.user_id = user.id;
                req.session.user_email = user.email;

                res.redirect('/cats')
            	});

						});
				});

			}
	});
});

module.exports = router;