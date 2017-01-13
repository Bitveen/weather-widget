const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const app = express();


const router = require('./routes');
const config = require('./config');


mongoose.connect(config.mongo.URI);
mongoose.Promise = Promise;


app.set('port', process.env.PORT || 8080);


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));





app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(router);
app.use(express.static(__dirname + '/public'));




app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}`));
