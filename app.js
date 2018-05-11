const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = Promise;  

mongoose.connect('mongodb://localhost/tasks', err => { err ? console.log('could not connect server') : app.listen('3000', () => { console.log('SERVER UP')})
});
const routes = require('./routes/index');
const users = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', routes);
app.use('/users', users);
