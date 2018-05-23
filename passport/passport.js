const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passport = require('passport');

module.exports = passport => {

    passport.serializeUser(function( user, done ){
        console.log('serialized')
        done( null, user.id );
    });
    passport.deserializeUser(function( id, done ){
        User.findById(id, (err, user) => {
            console.log(user);
            done( false, user );
        })
    });
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({ 'email' :  email }, (err, user) => {
            if ( err )
                return done( err );
            if ( user )
                return done( null, false );
            
                const newUser = new User();
                newUser.email = req.body.email;
                newUser.fname = req.body.fname;
                newUser.lname = req.body.lname;
                newUser.password = newUser.encryptPassword( req.body.password );

                newUser.save(function( err ) {
                    if ( err )
                        throw err;
                    return done( null, newUser );
                });
            });
        }));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done, next) => {
        
        User.findOne({ 'email' :  email }, (err, user) => {
            
            if (err)
                return done(err);
            if (!user)
                return done(null, false);

            if(!user.validPassword(req.body.password))
                return done(null, false);
            done(null, user);
            console.log(req.session);
            return;
        });

    }));

};
         
