var app = app || {};

(function() {
    var model = app.model.load('https://api.parse.com/1/');
    var controller = app.controller.load(model);

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            // Controller - Get homepage
			
			// Add ways to sort posts by get parameter
        });

        this.get('#/Login', function () {
            // Controller - Get Loginpage
        });

        this.get('#/Post', function () {
            // Controller - Get Post page
        });

        this.get('#/Create', function () {
            // Controller - Get create new post page
        });
    });

    app.router.run('#/');
}());