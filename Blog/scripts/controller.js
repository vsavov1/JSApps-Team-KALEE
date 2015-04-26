var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getHomePage = function (selector) {
        this.model.getPosts(1, 5)
            .then(function(data){
                app.homeView.load(selector, data);
            }, function(error){
                console.error(error);
            });
    };

    Controller.prototype.getSinglePostPage = function(selector, id){
        this.model.getPost(id)
            .then(function(data){
                app.postView.load(selector, data);
                $('#commentSend').on('click', function(){
                    alert('asd');
                });
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