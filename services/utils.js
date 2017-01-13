/*
    Localization of city names pretty simple
*/
module.exports.localizeCityName =  (city) => {
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
};
