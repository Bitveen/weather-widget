/*
    Routing
*/
const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/', (req, res) => {
    res.send('Hello, world');
});





module.exports = router;