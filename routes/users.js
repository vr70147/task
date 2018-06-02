const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
	if( req.isAuthenticated ) {
		next();
	}
	else {
		return res.status(200).json( { 'msg' : 'unauthorized user' } );
	}
	
};
router.get('/session', isLoggedIn, ( req, res ) => {
	console.log(req.permissions);
	return res.status(200).json(req.session);
});

router.get('/logout', ( req, res ) => {
	req.session.destroy( err => {
		if (err) throw err
		return res.json({'msg':'session destroyed'});
	})	
	// delete req.session.passport.user;
	
  });

router.post('/register', passport.authenticate('local.signup', {
    failureRedirect: '/users/errors',
    successRedirect: '/users/success'
}));
router.post('/login', passport.authenticate('local.login'),
	((req,res) => {
		if( req.isAuthenticated() ) 
			return res.send( { user : req.session.passport.user.fname } );
		return res.send( { msgError : 'username or password are incorrect' } );
	}));

router.get('/login', isLoggedIn, ( req, res ) => { 
	return res.send(true);
	// return res.send(false);
});

module.exports = router;