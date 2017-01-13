const express = require('express');
const router = express.Router();
const api = require('./api');
const User = require('../models/user');
const passport = require('passport');
const requireAuth = require('../middlewares/auth');


router.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


router.get('/', requireAuth, (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login');
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});


router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.redirect('/login');
});




router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    User.register(new User({ login: req.body.login }), req.body.password, (err, user) => {
        if (err) {
            return res.render('register', { user: user });
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect("/");
        });
    });

});










router.get('/widget/create', (req, res) => {
    res.render('create');
});



router.use('/api', api);


module.exports = router;
