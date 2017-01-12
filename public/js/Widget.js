var Widget = (function() {
    'use strict';

    function Widget(settings) {
        if (!(this instanceof Widget)) {
            return new Widget(settings);
        }
        this.city = settings.city || 'Moscow';
        this.days = settings.days || 1;
        this.layout = settings.layout || 'Horizontal';

        Object.defineProperty(this, 'code', {
            set: function(value) {
                
            }
        });

    }

    /* Для загрузки виджета с сервера */
    Widget.prototype.fetch = function() {};




    
    return Widget;
})();