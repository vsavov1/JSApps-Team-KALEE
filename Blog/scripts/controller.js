var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.loadInitialView = function () {
        if (localStorage['logged-in']) {
            $("#hiUserName").html('Hello, <span>' +
                localStorage['username'] + '</span>');
            $('#loginButton').html('<p>Logout</p>');
            $('#registerButton').remove();
        } else {
            $('#loginButton').html('<p>Login</p>');
            $('#hiUserName').text('');
        }
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
        this.loadInitialView();
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
        var _this = this;
        this.model.getPost(id)
            .then(function (data) {
                if (localStorage['logged-in']) {
                    data["logged-in"] = true;
                }
                app.postView.load(selector, data);

                _this.model.countView(id);
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

        this.loadInitialView();
        // Load login view from the view model
    };

     Controller.prototype.getRegisterPage = function (selector) {
        app.registerView.load(selector);
    };  // No register page for now
    
    Controller.prototype.getAdminPage = function (selector) {
        this.model.getPosts(0, 9)
            .then(function(data){
                app.adminView.load(selector, data);
            }, function(error){
                console.error(error);
            });
    };

    Controller.prototype.updatePost = function (selector, id, title, content, author) {
        this.model.editPost(id, title, content, author)
            .then(function(data) {
                app.postView.load(selector, data);
            }, function(error) {
                console.error(error);
            });
    };

    Controller.prototype.adminDeletePost = function(selector, id) {
        this.model.deletePost(id)
            .then(function() {
                this.model.getAdminPage(selector);
            }, function(error) {
                console.log(error);
            });
    };

    Controller.prototype.getAdminEditPostPage = function (selector, id) {
        this.model.getPost(id)
            .then(function(data){
                app.adminEditPostView.load(selector, data);

            }, function(error){
                console.log(error);
            });
    };

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());