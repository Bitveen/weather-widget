/* Control widget creation process */
var WidgetCreator = (function() {
    'use strict';
    var widgetForm = document.getElementById('widget-form');
    var citySelect = document.querySelector('[name=city]');
    var daysSelect = document.querySelector('[name=days]');
    var widgetLayouts = document.querySelectorAll('[name=layout]');
    var codeResult = document.getElementById('code-result');
    var createWidgetBtn = document.getElementById('create-widget-btn');



    // Create widget and get back code
    function formSubmitHandler(event) {
        event.preventDefault();

        var selectedCity = citySelect.options[citySelect.options.selectedIndex].value;
        var selectedDays = parseInt(daysSelect.options[daysSelect.options.selectedIndex].value, 10);
        var layoutsArray = Array.prototype.slice.call(widgetLayouts);
        var selectedLayout;

        layoutsArray.forEach(function(layout) {
            if (layout.checked) {
                selectedLayout = layout.value;
            }
        });
        var apiPath = '/widget?city=' + selectedCity + '&days=' + selectedDays + '&layout=' + selectedLayout;

        fetchTemplate(apiPath, function(template) {
            hideWidgetForm();
            codeResult.querySelector('.well').innerText = template;
        });

    }



    // API call for receive code and store widget in database
    function fetchTemplate(path, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', path, true);
        xhr.addEventListener('load', function(event) {
            var response = event.target;
            if (response.status === 200) {
                callback(response.responseText);
            }
        }, false);

        xhr.addEventListener('error', function(event) {}, false);
        xhr.send(null);
    }



    function showWidgetForm(event) {
        event.preventDefault();
        codeResult.classList.add('hidden');
        widgetForm.style.display = 'block';
    }

    function hideWidgetForm() {
        widgetForm.style.display = 'none';
        codeResult.classList.remove('hidden');
    }


    createWidgetBtn.addEventListener('click', showWidgetForm, false);
    widgetForm.addEventListener('submit', formSubmitHandler, false);
})();
