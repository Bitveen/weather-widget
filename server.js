const express = require('express');
const redis = require('redis');
const redisClient = redis.createClient();
const app = express();


const router = require('./routes');
const config = require('./config');


app.set('port', process.env.PORT || 8080);



app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.use(router);
app.use(express.static(__dirname + '/public'));




app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}`));
