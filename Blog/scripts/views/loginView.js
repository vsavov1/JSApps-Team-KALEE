var app = app || {};

app.loginView = (function() {
    // function LoginView(selector, data) {
    //     $.get('templates/login.html', function(template) {
    //         var output = Mustache.render(template);
    //         $(selector).html(output);
    //         $('#login').click(function (app) {
    //             app.controller.getHomePage(selector);
    //         });
    //     })
    // }
	
	// Sample solution using mustache - not necessary, can do it with DOM Manipulation as well.
	// Should do a Parse.com Login validation. Set a token in the local storage or as a cookie

    return {
        load: function (selector, data) {
            return new LoginView(selector, data);
        }
    }
}());