const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/session', ( req, res ) => {
	User.find({}, (err, cart) => {
		return res.send(req.session);
	})
});

router.post('/logout', ( req, res ) => {
  req.session.destroy( err => {
  	if (err) throw err
  })
  return res.redirect('/');
});

router.post('/login', passport.authenticate('local', { 
	failureRedirect : 'http://localhost:3000/users/session'
}), ( req, res ) => {
	if(req.session.passport.user.role) {
		return res.redirect('/session');
	};
	if(!req.session.passport.user.role) {
		return res.redirect('/session');
	};
});

router.post('/register',( req, res ) => {
	const id = req.body.id;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;
	const city = req.body.city;
	const street = req.body.street;
	const fname = req.body.fname;
	const lname = req.body.lname;
		
	
	const newUser = new User({
		id: id,
		email: email,
		password: password,
		city: city,
		street: street,
		fname: fname,
		lname: lname
	});
		User.createUser( newUser, ( err, user ) => {
			console.log('register');
			if( err ) throw err;
			return res.redirect('http://localhost:3000/users/session');
		});
	});

module.exports = router;