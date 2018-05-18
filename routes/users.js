const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/session', ( req, res ) => {
	User.find({}, (err, cart) => {
		return res.send(req.session);
	})
});

router.post('/register', passport.authenticate('local-signup', {
    failureRedirect: 'http://localhost:3000/errors',
    successRedirect: 'http://localhost:3000/success'

}));

module.exports = router;