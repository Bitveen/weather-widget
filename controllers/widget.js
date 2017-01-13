const pug = require('pug');
const ObjectId = require('mongoose').Schema.ObjectId;
const Widget = require('../models/widget');

const redisService = require('../services/redis');
const utilsService = require('../services/utils');
const apiService = require('../services/api');




/*
    Show all widgets
*/
module.exports.all = (req, res) => {
    res.render('index', {
        user: req.user
    });
};

/*
    JSONP Call for fetch weather from redis or api call
*/
module.exports.get = (req, res) => {
    let { callback } = req.query;
    let { widgetId } = req.params;

    Widget.findOne({ id: ObjectId(widgetId) }, (err, foundWidget) => {

        redisService.needFetch(widgetId, (result) => {
            if (result) {
                apiService.getWeather(foundWidget.city, foundWidget.days, (weatherList) => {
                    redisService.set(foundWidget.id, weatherList, (savedWeather) => {
                        res.send(callback + '(' + JSON.stringify(savedWeather) + ')');
                    });
                });
            } else {
                redisService.get(foundWidget.id, (weather) => {
                    res.send(callback + '(' + JSON.stringify(weather) + ')');
                });
            }
        });

    });
};


/*
    Show create widget form
*/
module.exports.create = (req, res) => {
    res.render('create');
};



/*
    TODO: update existing widget
*/
module.exports.update = (req, res) => {};

/*
    TODO: drop existing widget
*/
module.exports.drop = (req, res) => {};

/*
    Save created widget to the database(Mongo), fetch weather and set it to redis
*/
module.exports.store = (req, res) => {
    let {city, days, layout} = req.query;
    let userId = req.user.id;
    let compiledTemplate = pug.compileFile(req.app.get('views') + `/widgets/${layout}${days}.pug`);
    let widget = new Widget({ city, days, layout, userId });
    widget.save((err, savedWidget) => {
        if (err) {
            return res.redirect('/widget/create');
        }
        apiService.getWeather(city, days, (weatherList) => {
            redisService.set(savedWidget.id, weatherList, () => {
                res.send(compiledTemplate({
                    id: savedWidget.id,
                    city: utilsService.localizeCityName(city)
                }));
            });

        });

    });

};
