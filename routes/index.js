const express = require('express');
const router = express.Router();
const path = require('path');
const api = require('./api');



router.get('/widgets', (req, res) => {
    res.render('index');
});

router.get('/widgets/create', (req, res) => {
    res.render('create');
});



router.use('/api', api);


module.exports = router;
