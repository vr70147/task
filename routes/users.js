const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/session', ( req, res ) => {
	User.find({}, (err, user) => {
		if(!req.session.passport)
			req.session.passport = {'user': user};
		else if(req.session.destroy)
			delete req.session.passport;
		return res.send(req.session);
	})
});

router.get('/logout', ( req, res ) => {
	req.session.destroy( err => {
		if (err) throw err
	})
	return res.json({'msg':'session destroyed'});
  });

router.get('/errors', (req, res) => {
	const errMsg = { msgError: 'username or password are incorrect'};
	return res.json(errMsg);
});
router.get('/success', (req, res) => {
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

module.exports = router;