const express = require('express');
const router = express.Router();


router.get('/', () => {
    res.json({ name: 'Max' });
});


module.exports = router;