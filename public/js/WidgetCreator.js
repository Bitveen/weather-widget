/* Control widget creation process */
var WidgetCreator = (function() {
    'use strict';
    var widgetForm = document.getElementById('widget-form');
    var citySelect = document.querySelector('[name=city]');
    var daysSelect = document.querySelector('[name=days]');
    var widgetTypes = document.querySelectorAll('[name=type]');


    function formSubmitHandler(event) {
        event.preventDefault();

        var selectedCity = citySelect.options[citySelect.options.selectedIndex].value;
        var selectedDays = parseInt(daysSelect.options[daysSelect.options.selectedIndex].value, 10);
        var typesArray = Array.prototype.slice.call(widgetTypes);
        var selectedType;
        typesArray.forEach(function(type) {
            if (type.checked) {
                selectedType = type.value;
            }
        });
        var apiPath = '/api/code?city=' + selectedCity + '&days=' + selectedDays + '&type=' + selectedType;
        fetchTemplate(apiPath, function(template) {
            var codeResultDiv = document.getElementById('code-result');
            codeResultDiv.classList.remove('hidden');
            codeResultDiv.innerText = template;
        });
    }




    function fetchTemplate(path, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.addEventListener('load', function(event) {
            var response = event.target;
            if (response.status === 200) {
                callback(response.responseText);
            }
        }, false);
        xhr.addEventListener('error', function(event) {
            console.log('error');
        }, false);
        xhr.send(null);
    }



    widgetForm.addEventListener('submit', formSubmitHandler, false);
})();
