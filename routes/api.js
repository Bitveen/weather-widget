const express = require('express');
const router = express.Router();
const pug = require('pug');
const request = require('request');
const config = require('../config');

router.get('/code', (req, res) => {
    let {city, days, type} = req.query;
    let compiledTemplate = pug.compileFile(req.app.get('views') + '/code.pug');

    request(`${config.api.PATH}?q=${city}&units=metric&cnt=${days}&APPID=${config.api.ID}`, (error, response, body) => {
        res.send(body);
    });


    // let template = compiledTemplate({
    //     city, days, type
    // });
    //
    // res.status(200).send(template);
});





module.exports = router;
