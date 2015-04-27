var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.loadInitialView = function () {
        $('#center').empty();
        $('#leftSide').empty();
        $('#rightSide').empty();
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

    Controller.prototype.getNewestPostView = function (selector) {
        this.model.getNewstPosts()
            .then(function(data) {
                app.newestPostView.load(selector, data, "topPosts");
            }, function(error) {
                console.error(error);
            });
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
        this.loadInitialView();
        var _this = this;
        this.model.getPost(id)
            .then(function (data) {
                if (localStorage['logged-in']) {
                    data["logged-in"] = true;
                }
                console.log(data);
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
        this.loadInitialView();
        app.registerView.load(selector);
    };  // No register page for now
    
    Controller.prototype.getAdminPage = function (selector) {
        this.loadInitialView();
        this.model.getPosts()
            .then(function(data){
                app.adminView.load(selector, data);
            }, function(error){
                console.error(error);
            });
    };

    Controller.prototype.adminDeletePost = function(selector, id) {
        this.model.deletePost(id)
            .then(function(data) {
                var splitted = window.location.href.split('#');
                window.location.replace(splitted[0] + '#/Admin');
                poppy.pop('success', 'Success', 'The post has been deleted successfully');
            }, function(error) {
                poppy.pop('error', 'Error', error.statusText);
            });
    };

    Controller.prototype.adminDeleteComment = function (selector, id) {
        this.model.deleteComment(id)
            .then(function (data) {
                var splitted = window.location.href.split('#');
                window.location.replace(splitted[0] + '#/Admin');
                poppy.pop('success', 'Success', 'The comment has been deleted successfully');
            }, function (error) {
                poppy.pop('error', 'Error', error.statusText);
            });
    };

    Controller.prototype.getAdminEditPostPage = function (selector, id) {
        this.loadInitialView();
        this.model.getPost(id)
            .then(function(data){
                app.adminEditPostView.load(selector, data);

            }, function(error){
                console.log(error);
            });
    };

    Controller.prototype.getAdminCreatePostPage = function(selector) {
        app.adminCreatePostPage.load(selector);
    };

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());