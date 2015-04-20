var app = app || {};

app.serverManager = (function() {
    function ServerManager(baseUrl) {
        this._requester = app.requester.load(baseUrl);
        this.postsRepo = {
            posts: []
        };
    }

    ServerManager.prototype.getPosts = function (start, length) {
        var defer = Q.defer();
        var _this = this;
        this.postsRepo.posts.length = 0;

        this._requester.get('classes/Post/')
            .then(function (data) {
            if (!start) {
                start = 0;
                length = data.results.length;
            }

            for (var index = start; index < length; index++) {
                // Initialize a post from the Post model which is yet to be created.
                // Push it to the postsRepo
            }

            defer.resolve(_this.studentsRepo);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    ServerManager.prototype.getPost = function (id) {
        // (When logged in only! - add security in the server and don't allow new post screen to show up)

        var defer = Q.defer();
        this._requester.get('classes/Post/' + id)
            .then(function(data) {
                var post = data;

                // Convert the normal post to a post model
                // load its comments from the db

            defer.resolve(post);
            }, function(error) {
                defer.reject(error);
            });
        
        return defer.promise;

    } 

    ServerManager.prototype.newPost = function(title, content, author) {
        var defer = Q.defer();
        var data = {
            'title': title,
            'content': content,
            'author': author
        }

        this._requester.post('classes/Post', data).then(function(data) {
            defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    ServerManager.prototype.editPost = function(id, title, content, author) {
        var defer = Q.defer();
        var data = {
            'title': title,
            'content': content,
            'author': author
        }

        this._requester.put('classes/Post/' + id, data)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }
	
	// Delete post

    // Post a comment

    ServerManager.prototype.login = function(username, password) {
        var defer = Q.defer();
        this._requester.get('login?username=' + username + '&password=' + password)
            .then(function(data) {
                localStorage["logged-in"] = data.sessionToken;
                defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    ServerManager.prototype.logout = function() {
        var defer = Q.defer();
        this._requester.post('logout').then(function(data) {
            defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }


    return {
        load: function (baseUrl) {
            return new ServerManager(baseUrl);
        }
    }
}());

// This was originally a students repo from another project. 
// We can correspondingly convert it to a posts repo. 
// Later on, we should implement getting posts by given condition.
// We should implement get posts by selector and get post by selector (for the posts view).