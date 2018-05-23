const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/session', ( req, res ) => {
	User.find({}, (err, user) => {
		return res.send(req.session);
	})
});

router.get('/logout', ( req, res ) => {
	req.session.destroy( err => {
		if (err) throw err
	})
	console.log(req.session);
	
	// delete req.session.passport.user;
	return res.json({'msg':'session destroyed'});
  });

router.get('/errors', isLoggedIn, (req, res) => {
	const errMsg = { msgError: 'username or password are incorrect'};
	return res.json(errMsg);
});
router.get('/success', isLoggedIn, (req, res) => {
	const successMsg = { msgSuccess: '1'};
	return res.json(successMsg);

});

router.post('/register', passport.authenticate('local-signup', {
    failureRedirect: '/users/errors',
    successRedirect: '/users/success'

}));
router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/users/errors',
    successRedirect: '/users/success'

}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
	  console.log('yes!!!!')
	  return next();
	}
	console.log('nooooo!!!!')
	return res.sendStatus(401);
};

module.exports = router;