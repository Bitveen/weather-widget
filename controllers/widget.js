const User = require('../models/user');
const pug = require('pug');





function localizeCityName(city) {
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






module.exports = {

    // all widgets
    all(req, res) {
        res.render('index', {
            user: req.user
        });
    },
    // one widget API call

    get(req, res) {
        // return current weather from db
        // or if it's not an actual weather make an api call
        // and save it to database
        // and response back
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
        let compiledTemplate = pug.compileFile(req.app.get('views') + '/code.pug');
        User.findOneAndUpdate({ login: req.user.login }, { '$addToSet': { widgets: { city, days, layout } }}, {new: true}, (err, updatedUser) => {
            if (err) {
                return res.redirect('/widget/create');
            }
            res.send(compiledTemplate({
                id: updatedUser.widgets[updatedUser.widgets.length - 1].id,
                days: days,
                layout: layout,
                city: localizeCityName(city)
            }));
        });


    }
};
