/*
    App entry point
*/
const express = require('express');
const redis = require('redis');
const redisClient = redis.createClient();
const router = require('./routes');
const app = express();


app.use(router);
