const express = require('express');
const router = express.Router();
const Widgets = require('../controllers/widgets');

router.get('/', Widgets.all);
router.get('/widget/create', Widgets.create);
router.get('/widget/:widgetId', Widgets.get);
router.put('/widget/:widgetId', Widgets.update);
router.delete('/widget/:widgetId', Widgets.drop);
router.post('/widget', Widgets.store);

module.exports = router;
