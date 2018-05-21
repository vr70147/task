const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passport = require('passport');

module.exports = passport => {

    passport.serializeUser((user, done) => done(null, user.id));

    // used to deserialize the user
    passport.deserializeUser((user, done) => done(null, user));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({ 'email' :  email }, (err, user) => {
            if (err)
                return done(err);
            if (user)
                return done(null, false);
            
                const newUser = new User();
                newUser.email = req.body.email;
                newUser.fname = req.body.fname;
                newUser.lname = req.body.lname;
                newUser.password = newUser.encryptPassword(req.body.password);

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            });
        }));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({ 'email' :  email }, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);

            if(!user.validPassword(req.body.password))
                return done(null, false);
            req.session.passport = { 'user': user };
            return done(null, user);
        });
    })),
    (req, res, next) => {
        if (req.isAuthenticated()) {
          return next();
        }
        return res.sendStatus(401);
      };

};
         
