const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const mongoUrl = 'mongodb://vr70147:pb63xbcx@ds137740.mlab.com:37740/tasks';
mongoose.Promise = Promise;  
const routes =  require('./routes/index');
const users =  require('./routes/users');

// Open connection to mongoDB
mongoose.connect(mongoUrl, err => { err ? console.log('could not connect server') : app.listen('3000', () => { console.log('SERVER UP')})
});


// Define headers
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true
}))

// Init parsers
app.use( logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// Define session and cookie
app.use(session({
    secret: 'mytaskmanagementsystem',
    resave: false,
    saveUninitialized: false,
    name: 'user_cook',
    cookie: {
        httpOnly: false,
        maxAge: 10000 * 600 * 5
     },
    store: new MongoStore({
    url: mongoUrl
  })
}));

// Init passport
require('./passport/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Define roots
app.use('/', routes);
app.use('/users', users);
