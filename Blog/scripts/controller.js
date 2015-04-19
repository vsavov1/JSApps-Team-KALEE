var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getHomePage = function (selector) {
        // app.homeView.load(selector);
		
		// Load home view from the view model - display all the posts
    };

    Controller.prototype.getLoginPage = function (selector) {
        // app.loginView.load(selector);
		
		// Load login view from the view model
    };

    /* Controller.prototype.getRegisterPage = function (selector) {
        app.registerView.load(selector);
    }; */ // No register page for now

    /* Controller.prototype.getStudentsPage = function (selector) {
        this.model.getStudents()
            .then(function (data) {
                app.studentsView.load(selector, data);
            }, function (error) {
                console.log(error);
            })
    }; */ 
	// Left it for a sample promise to see

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());