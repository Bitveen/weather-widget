const redis = require('redis');
const redisClient = redis.createClient();

/*
    Set weather info to redis
*/
module.exports.set = (widgetId, weatherList, callback) => {
    let curDate = Date.now();
    let fetchedWeather = JSON.stringify(weatherList);
    let dataToSet = [
        'date',
        curDate,
        'weather',
        fetchedWeather
    ];

    redisClient.hmset('widget.' + widgetId, dataToSet, (err, success) => {
        callback({ date: curDate, weather: fetchedWeather });
    });
};

/*
    Get weather info from redis
*/
module.exports.get = (widgetId, callback) => {
    redisClient.hgetall('widget.' + widgetId, (err, weather) => {
        callback(weather);
    });
};


/*
    Check if we need to fetch new weather data from api
*/
module.exports.needFetch = (widgetId, callback) => {
    redisClient.hgetall('widget.' + widgetId, (err, data) => {
        let weatherDate = new Date(data.date).toLocaleDateStirng();
        let curDate = new Date().toLocaleDateStirng();
        callback(!data || curDate !== weatherDate);
    });
};
