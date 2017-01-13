const config = require('../config');
const request = require('request');


/*
    API Call for fetch weather from "openweathermap"
*/
module.exports.getWeather = (city, days, callback) => {
    let uri = `${config.api.PATH}?q=${city}&units=metric&lang=ru&cnt=${days}&APPID=${config.api.ID}`;
    request(uri, (error, response, body) => {
        if (error) {
             return res.status(404).send({ error: error });
        }
        if (response.statusCode === 200) {
            let weather = JSON.parse(body);
            callback(weather.list);
        }

    });
};
