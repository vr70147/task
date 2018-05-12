const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', ( req, res ) => {
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;

    const newUser = new User({
        email : email,
        password : password,
        fname : fname,
        lname : lname
    })

    User.createUser( newUser, ( err, user ) => {
        if( err ) throw err;
        return res.json(newUser);
    });
})

module.exports = router;