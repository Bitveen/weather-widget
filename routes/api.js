const express = require('express');
const router = express.Router();
const pug = require('pug');
const request = require('request');
const config = require('../config');

const redis = require('redis');
const redisClient = redis.createClient();



router.post('/code', (req, res) => {
    


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








module.exports = router;
