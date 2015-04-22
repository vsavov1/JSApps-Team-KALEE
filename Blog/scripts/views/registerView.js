 var app = app || {};

app.registerView = (function() {
    function RegisterView(selector, data) {
        $(selector).empty();
        $('#rightSide').empty();
        $('#leftSide').empty();

        if(!$("#register").length){
            $.get('templates/register.html', function(template) {
                var output = Mustache.render(template);
                $(selector).append(output);
            })
        }
    }

    return {
        load: function (selector, data) {
            return new RegisterView(selector, data);
        }
    }
}()); 

// We don't have one for now
