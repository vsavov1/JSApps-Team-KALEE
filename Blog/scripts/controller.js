var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getLatestPostView = function (selector) {
        this.model.getPosts(1,6)
            .then(function(data){
                app.latestPostView.load(selector, data, "topPosts");
        }, function(error){
            console.error(error);
        })

    }

    Controller.prototype.getHomePage = function (selector) {
        if (localStorage['logged-in']) {
            $("#headerContainer").append($('<p id="hiUserName">Hello, <span>' + localStorage['username'] + '</span></p>'));
            $('#loginButton').html('<p>Logout</p>');
            $('#registerButton').remove();
        } else {
            $('#loginButton').html('<p>Login</p>');
            $('#hiUserName').remove();
        }

        this.model.getTopPosts()
            .then(function(data){
                app.homeView.load(selector, data, "topPosts");
        }, function(error){
            console.error(error);
        })
       
        this.model.getMostViewedPosts()
            .then(function(data){
                app.homeView.load(selector, data, "mostViewedPosts");
            }, function(error){
                console.error(error);
            });
    };

    Controller.prototype.getSinglePostPage = function (selector, id) {
        $('#center').html('');
        this.model.getPost(id)
            .then(function (data) {
                if (localStorage['logged-in']) {
                    data["logged-in"] = true;
                }
                app.postView.load(selector, data);

            }, function(error) {
                poppy.pop('error', 'Error', 'There was an error loading this post. ' +
                    'Please try again later.');
            });
    };

    Controller.prototype.getLoginPage = function (selector) {
        if (localStorage['logged-in']) {
            app.model.logout().then(function(data) {
                var splitted = window.location.href.split('#');
                window.location.replace(splitted[0] + '#/');
                poppy.pop('success', 'Success', 'You have logged out successfully');
            });
        } else {
            app.loginView.load(selector);
        }
        
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