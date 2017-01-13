const pug = require('pug');
const redis = require('redis');
const request = require('request');


const config = require('../config');
const ObjectId = require('mongoose').Schema.ObjectId;
const Widget = require('../models/widget');
const redisClient = redis.createClient();


const localizeCityName = (city) => {
    switch (city) {
        case 'Moscow':
            return 'Москва';
        case 'Saint Petersburg':
            return 'Санкт-Петербург';
        case 'Nizhniy Novgorod':
            return 'Нижний Новгород';
        default:
            return 'Неизвестный город';
    }
}



const getWeather = (city, days, callback) => {
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

const setWeatherToDB = (widgetId, weatherList, callback) => {
    let curDate = Date.now();
    let fetchedWeather = JSON.stringify(weatherList);
    let dataToSet = [
        'date',
        curDate,
        'weather',
        fetchedWeather
    ];

    redisClient.hmset('widget.' + widgetId, dataToSet, (err, success) => {
        //redisClient.hgetall('widget.' + savedWidget.id, (err, obj) => {
        callback({ date: curDate, weather: fetchedWeather });
    });

};


const getWeatherFromDB = (widgetId, callback) => {

    redisClient.hgetall('widget.' + widgetId, (err, weather) => {
        callback(weather);
    });

};


module.exports = {

    // all widgets
    all(req, res) {
        res.render('index', {
            user: req.user
        });
    },

    get(req, res) {
        // JSONP
        let { callback } = req.query;
        let { widgetId } = req.params;

        Widget.findOne({ id: ObjectId(widgetId) }, (err, foundWidget) => {

            redisClient.hgetall('widget.' + widgetId, (err, data) => {
                let weatherDate = new Date(data.date).toLocaleDateStirng();
                let curDate = new Date().toLocaleDateStirng();
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');


                if (!data || curDate !== weatherDate) {
                    getWeather(foundWidget.city, foundWidget.days, (weatherList) => {
                        setWeatherToDB(foundWidget.id, weatherList, (savedWeather) => {
                            res.send(callback + '(' + JSON.stringify(savedWeather) + ')');
                        });
                    });
                } else {
                    getWeatherFromDB(foundWidget.id, (weather) => {
                        res.send(callback + '(' + JSON.stringify(weather) + ')');
                    });
                }
            });



        });












    },

    // form create new widget
    create(req, res) {
        res.render('create');
    },
    // update existing widget API call
    update(req, res) {

    },
    // delete widget API call
    drop(req, res) {

    },

    // create widget
    store(req, res) {
        let {city, days, layout} = req.query;
        let userId = req.user.id;
        let compiledTemplate = pug.compileFile(req.app.get('views') + `/widgets/${layout}${days}.pug`);

        let widget = new Widget({ city, days, layout, userId });

        widget.save((err, savedWidget) => {
            if (err) {
                return res.redirect('/widget/create');
            }
            getWeather(city, days, (weatherList) => {
                setWeatherToDB(savedWidget.id, weatherList, () => {
                    res.send(compiledTemplate({
                        id: savedWidget.id,
                        city: localizeCityName(city)
                    }));
                });

            });



        });


    }
};
