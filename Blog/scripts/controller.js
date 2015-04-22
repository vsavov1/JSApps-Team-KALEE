var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getHomePage = function (selector) {
        this.model.getPosts(0, 2)
            .then(function(data){
                app.homeView.load(selector, data);
            }, function(error){
                console.error(error);
            });
    };

    Controller.prototype.getPost = function(selector, id){
        this.model.getPost(id)
            .then(function(data){
                app.postView.load(selector, data);
                console.log(data);
            }, function(error){
                console.log(error);
            });
    };

    Controller.prototype.getLoginPage = function (selector) {
        app.loginView.load(selector);
		
		// Load login view from the view model
    };

     Controller.prototype.getRegisterPage = function (selector) {
        app.registerView.load(selector);
    };  // No register page for now

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