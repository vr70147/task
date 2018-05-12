const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
mongoose.Promise = Promise;  

mongoose.connect('mongodb://localhost/tasks', err => { err ? console.log('could not connect server') : app.listen('3000', () => { console.log('SERVER UP')})
});
const routes = require('./routes/index');
const users = require('./routes/users');
app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

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
    url: "mongodb://localhost:27017/tasksa"
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
