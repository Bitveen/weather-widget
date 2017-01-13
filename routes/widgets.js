const express = require('express');
const router = express.Router();
const Widget = require('../controllers/widget');
const requireAuth = require('../middlewares/auth');

router.use((req, res, next) => {
    res.locals.path = req.path;
    res.locals.user = req.user;
    next();
});

router.use(requireAuth);

router.get('/', Widget.all);
router.get('/widget/create', Widget.create);
router.get('/widget/:widgetId', Widget.get);
router.put('/widget/:widgetId', Widget.update);
router.delete('/widget/:widgetId', Widget.drop);
router.post('/widget', Widget.store);

module.exports = router;
