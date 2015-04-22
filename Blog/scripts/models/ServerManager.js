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
                if (!data.results[index]) {
                    break;
                }

                var id = data.results[index].objectId;
                var title = data.results[index].title;
                var content = data.results[index].content;
                var author = data.results[index].author;
                var dateCreated = data.results[index].createdAt;

                var post = new Post(id, title, content, author, dateCreated);
                _this.postsRepo.posts.push(post);
            }

            defer.resolve(_this.postsRepo);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    ServerManager.prototype.getPost = function (id) {
        // (When logged in only! - add security in the server and don't allow new post screen to show up)
        var defer = Q.defer();
        var _this = this;

        this._requester.get('classes/Post/' + id)
            .then(function(data) {
                var id = data.objectId;
                var title = data.title;
                var content = data.content;
                var author = data.author;
                var dateCreated = data.createdAt;
                var whereParameter = '{' +
                    '"post":' +
                        '{"__type":"Pointer","className":"Post","objectId":"' + id + '"}' +
                    '}';
                var post = new Post(id, title, content, author, dateCreated);

                _this._requester.get('classes/Comment?where=' + whereParameter)
                    .then(function(data) {
                    for (var comment in data.results) {
                        var id = data.results[comment].objectId;
                        var content = data.results[comment].content;
                        var author = data.results[comment].author;
                        var dateCreated = data.results[comment].createdAt;

                        var comment = new Comment(id, content, author, dateCreated);
                        post.addComment(comment);
                    }
                });
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
	
	ServerManager.prototype.deletePost = function(id) {
	    var defer = Q.defer();

	    this._requester.delete('classes/Post/' + id);
        // delete the comments corresponding to this post
	}

    // Post a comment
    // Delete a comment

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