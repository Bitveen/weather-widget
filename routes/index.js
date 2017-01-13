const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const widgets = require('./widgets');

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


router.use(widgets);


module.exports = router;
