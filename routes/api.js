const express = require('express');
const router = express.Router();
const pug = require('pug');

router.get('/code', (req, res) => {
    let {city, days, type} = req.query;
    let compiledTemplate = pug.compileFile(req.app.get('views') + '/code.pug');
    let template = compiledTemplate({
        city, days, type
    });
    res.status(200).send(template);
});


module.exports = router;