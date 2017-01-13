const express = require('express');
const router = express.Router();
const pug = require('pug');
const request = require('request');
const config = require('../config');

const redis = require('redis');
const redisClient = redis.createClient();


let data = [];



router.get('/code', (req, res) => {
    let {city, days, type} = req.query;
    //console.log(req.hostname);
    let compiledTemplate = pug.compileFile(req.app.get('views') + '/code.pug');

    


    // request(`${config.api.PATH}?q=${city}&units=metric&cnt=${days}&APPID=${config.api.ID}`, (error, response, body) => {
    //     if (err) {
    //         return res.status(404).send({ error: error });
    //     }
    //     if (response.statusCode === 200) {
    //         let template = compiledTemplate({
    //
    //         });
    //
    //         res.status(200).send(template);
    //     }
    // });
});


request.get('/widget', (req, res) => {

});








module.exports = router;
