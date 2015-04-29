var app = app || {};

/*
 * This is the model working directly with the requester and handling requests to the server.
 */
app.serverManager = (function() {
    function ServerManager(requester) {
        this._requester = requester;
        this._userRoleId = 'xhUdV5Q3FI';
        this._adminRoleId = 'wcSwXfFGjz';
        this.postsRepo = {
            posts: []
        };
        this.topPostRepo = {
            posts: [ ]
        };
        this.mostViewPostRepo = {
            posts: [ ]
        };
        this.newestPostsRepo = {
            posts: [ ]
        };
        this.searchPostRepo = {
            posts: [ ]
        }
    }

    /*
     * Returns a promise containing an array of Post objects or an error
     */

    ServerManager.prototype.search = function (keyWords) {
        var defer = Q.defer();
        var _this = this;
        this.searchPostRepo.posts.length = 0;
        this._requester.get('classes/Post/')
            .then(function (data) {
                var keyWordsRepo = keyWords.split(' ');

                for (var index = 0; index < data.results.length && keyWords.length != 0; index++) {
                    if (!data.results[index]) {
                        break;
                    }

                    if(!data.results[index].tags){
                        continue;
                    }

                    var postTags = data.results[index].tags;

                    for (var i = 0; i < postTags.length; i++) {
                        for (var z = 0; z < keyWordsRepo.length; z++) {
                            var isContain = false;
                            var postTagCheck = postTags[i].toLowerCase().trim();
                            var keyWordCheck = keyWordsRepo[z].toLowerCase().trim();
                            var titleCheck = data.results[index].title.toLowerCase().trim();
                            if (postTagCheck === keyWordCheck ||
                                keyWordCheck === titleCheck ||
                                titleCheck.indexOf(keyWordCheck) >= 0) {

                                isContain = true;
                            }

                            if (isContain) {
                                var id = data.results[index].objectId;
                                var title = data.results[index].title;
                                var content = data.results[index].content;
                                var author = data.results[index].author;
                                var dateCreated = data.results[index].createdAt;
                                var viewsCount = data.results[index].viewsCount;
                                var voteCount = data.results[index].voteCount;
                                var commentsCount = data.results[index].commentsCount;
                                var img = data.results[index].img;
                                var tags = data.results[index].tags;

                                var post = new Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, null, img, tags);
                                _this.searchPostRepo.posts.push(post);
                                break;
                            }
                        }
                        if (isContain) {
                            break;
                        }

                    }
                }

                defer.resolve(_this.searchPostRepo);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

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
                var iterationStart = start >= data.results.length ? 0 : start;
                var iterationLength = length >= data.results.length ? data.results.length : length;

                for (var index = iterationStart; index < iterationLength; index++) {
                    if (!data.results[index]) {
                        break;
                    }

                    var id = data.results[index].objectId;
                    var title = data.results[index].title;
                    var content = data.results[index].content;
                    var author = data.results[index].author;
                    var dateCreated = data.results[index].createdAt;
                    var viewsCount = data.results[index].viewsCount;
                    var voteCount = data.results[index].voteCount;
                    var commentsCount = data.results[index].commentsCount;
                    var img = data.results[index].img;
                    var tags = data.results[index].tags;
                    var post = new Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, null, img, tags);
                    _this.postsRepo.posts.push(post);
                }
                defer.resolve(_this.postsRepo);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

     ServerManager.prototype.getNewestPosts = function () {
        var defer = Q.defer();
        var _this = this;
        this.newestPostsRepo.posts.length = 0;

        this._requester.get('classes/Post/')
            .then(function (data) {
            var tempRepo = _.sortBy(data.results, function(post) {
                return post.createdAt;
            });

            var iterationLength = tempRepo.length - 5 >= 0 ? tempRepo.length - 5 : 0;

            for (var index = tempRepo.length; index > iterationLength; index--) {
                var id = tempRepo[index - 1].objectId;
                var title = tempRepo[index - 1].title;
                var content = tempRepo[index - 1].content;
                var author = tempRepo[index - 1].author;
                var dateCreated = tempRepo[index - 1].createdAt;
                var viewsCount = tempRepo[index - 1].viewsCount;
                var voteCount = tempRepo[index - 1].voteCount;
                var commentsCount = tempRepo[index - 1].commentsCount;
                var img = tempRepo[index - 1].img;
                var tags = tempRepo[index - 1].tags;
                var post = new Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, null, img, tags);
                _this.newestPostsRepo.posts.push(post);
            }
            defer.resolve(_this.newestPostsRepo);
            }, function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };


    ServerManager.prototype.getMostViewedPosts = function () {
        var defer = Q.defer();
        var _this = this;
        this.mostViewPostRepo.posts.length = 0;

        this._requester.get('classes/Post/')
            .then(function (data) {
            var tempRepo = _.sortBy(data.results, function(post) {
                return post.viewsCount;
            });

            var iterationLength = tempRepo.length - 3 >= 0 ? tempRepo.length - 3 : 0;

            for (var index = tempRepo.length; index > iterationLength; index--) {
                var id = tempRepo[index - 1].objectId;
                var title = tempRepo[index - 1].title;
                var content = tempRepo[index - 1].content;
                var author = tempRepo[index - 1].author;
                var dateCreated = tempRepo[index - 1].createdAt;
                var viewsCount = tempRepo[index - 1].viewsCount;
                var voteCount = tempRepo[index - 1].voteCount;
                var commentsCount = tempRepo[index - 1].commentsCount;
                var img = tempRepo[index - 1].img;
                var tags = tempRepo[index - 1].tags;
                var post = new Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, null, img, tags);
                _this.mostViewPostRepo.posts.push(post);
            }
            defer.resolve(_this.mostViewPostRepo);
            }, function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    ServerManager.prototype.getTopPosts = function () {
        var defer = Q.defer();
        var _this = this;
        this.topPostRepo.posts.length = 0;

        this._requester.get('classes/Post/')
            .then(function (data) {
                var tempRepo = _.sortBy(data.results, function(post) {
                    return post.voteCount;
                });
                
                var length = tempRepo.length - 4 >= 0 ? tempRepo.length - 4 : 0;

                for (var index = tempRepo.length; index > length; index--) {
                    var id = tempRepo[index - 1].objectId;
                    var title = tempRepo[index - 1].title;
                    var content = tempRepo[index - 1].content;
                    var author = tempRepo[index - 1].author;
                    var dateCreated = tempRepo[index - 1].createdAt;
                    var viewsCount = tempRepo[index - 1].viewsCount;
                    var voteCount = tempRepo[index - 1].voteCount;
                    var commentsCount = tempRepo[index - 1].commentsCount;
                    var img = tempRepo[index - 1].img;
                    var tags = tempRepo[index - 1].tags;
                    var post = new Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount,  null, img, tags);
                    _this.topPostRepo.posts.push(post);
                }
                defer.resolve(_this.topPostRepo);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    /*
     * Returns a Post object containing an array of objects of type Comment.
     */
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
                var viewsCount = data.viewsCount;
                var voteCount = data.voteCount;
                var commentsCount = data.commentsCount;

                var img = data.img;
                var tags = data.tags;
                var whereParameter = '{' +
                    '"post":' +
                        '{"__type":"Pointer","className":"Post","objectId":"' + id + '"}' +
                    '}';
                var post = new Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, null, img, tags);

                var commentNumber = 1;
                _this._requester.get('classes/Comment?where=' + whereParameter)
                    .then(function(data) {
                    for (var comment in data.results) {
                        var id = data.results[comment].objectId;
                        var content = data.results[comment].content;
                        var author = data.results[comment].author;
                        var date = new Date(data.results[comment].createdAt);
                        var dateCreated = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());


                        var commentModel = new Comment(id, content, author, dateCreated, commentNumber);
                        commentNumber++;
                        post.addComment(commentModel);
                    }

                    defer.resolve(post);
                });

            }, function(error) {
                defer.reject(error);
            });
        
        return defer.promise;
    };

    /*
     * Creates a new post in the database with the given title, author and content
     */
    ServerManager.prototype.newPost = function(title, content, author, picUrl, tags) {
        var defer = Q.defer();
        var errors = [];
        if(!title || title.length == 0) {
            errors.push('no title');
        }
        if(!content || content.length == 0) {
            errors.push('no content');
        }
        if(!author || author.length == 0) {
            errors.push('no author');
        }
        if(!picUrl || picUrl.length == 0) {
            errors.push('no picture url');
        }
        if(!tags || tags.length == 0) {
            errors.push('no tags');
        }

        if(errors.length > 0) {
            defer.reject(errors);
        }

        var data = {
            'title': title,
            'content': content,
            'author': author,
            'voteCount': 0,
            'viewsCount' : 0,
            'img': picUrl,
            'tags': tags
        };

        this._requester.post('classes/Post', data).then(function(data) {
            defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    /*
     * Edits a given post from the database, switching the old properties with the new ones.
     */
    ServerManager.prototype.editPost = function(id, title, content, author, tags, pic) {
        var defer = Q.defer();
        var data = {
            'title': title,
            'content': content,
            'author': author,
            'tags': tags,
            'img': pic
        };

        this._requester.put('classes/Post/' + id, data)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

     ServerManager.prototype.getMostUsedTags = function(numberOfTags) {
        var defer = Q.defer();
        var tags = {};
        var returnTags = {};
 
        this.getPosts()
            .then(function(data){
                data.posts.forEach(function(post){
                    if(post.tags) {
                        post.tags.forEach(function(tag){
                            if(tags[tag] != undefined) {
                                tags[tag]++;
                            } else {
                                tags[tag] = 1;
                            }
                        });
                    }
                });

                var tagsKeys = Object.keys(tags);
                for(var i = 0; i < numberOfTags; i++) {
                    returnTags[tagsKeys[i]] = tags[tagsKeys[i]];
                }
                defer.resolve(returnTags);

            });

        return defer.promise;
    };

	
    /*
     * Deletes a given post from the database by objectId
     */
	ServerManager.prototype.deletePost = function(id) {
	    var defer = Q.defer();

	    this._requester.delete('classes/Post/' + id).then(function(data) {
	        defer.resolve(data);
	    }, function(error) {
	        defer.reject(error);
	    });

	    var whereParameter = '{' +
                    '"post":' +
                        '{"__type":"Pointer","className":"Post","objectId":"' + id + '"}' +
                    '}';

	    this._requester.get('classes/Comment?where=' + whereParameter)
            .then(function (data) {
                for (var comment in data.results) {
                    this.deleteComment(data.results[comment].objectId);
                }
            });

	    return defer.promise;
	};

    /*
     * Creates a new Comment in the database for a given post (given by objectId) 
     * with the corresponding properties (author, content).
     */


    ServerManager.prototype.postComment = function(postId, author, content) {
        var _this = this;
        var defer = Q.defer();
        var data = {
            "content": content,
            "author" : author,
            "commentNumber": ($('.comment').length+1) + '',
            "post": {
                "__type": "Pointer",
                "className": "Post",
                "objectId": postId
            }
        };

        var comment = data;

        this._requester.post('classes/Comment', data)
            .then(function (data) {
                var date = new Date();
                comment.dateCreated = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
                defer.resolve(app.commentView.load('#comments', comment));
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    /*
     * Deletes a given Comment from the database by a given objectId
     */
    ServerManager.prototype.deleteComment = function (id) {
        var defer = Q.defer();

        this._requester.delete('classes/Comment/' + id)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });;

        return defer.promise;
    }

    /*
     * Logs in an existing user from the database by a given username and password.
     * Also sets a "logged-in" key in the localStorage containing the received sessionToken
     */
    ServerManager.prototype.login = function(username, password) {
        var defer = Q.defer();
    
        this._requester.get('login?username=' + username + '&password=' + password)
            .then(function(data) {
                localStorage["logged-in"] = data.sessionToken;
				localStorage["username"] = data.username;
				defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    /*
     * Logs out the current user from the parse.com database.
     * Also deletes the current sessionToken from the localStorage.
     */
    ServerManager.prototype.logout = function() {
        var defer = Q.defer();
        this._requester.post('logout').then(function(data) {
            delete localStorage['logged-in']; 
			delete localStorage['username'];
			$("#loginButton").before($('<a href="#/Register" id="registerButton"><p>Become a member</p></a>'));
			defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    /*
     * Registers a given user with given password.
     */
    ServerManager.prototype.register = function(username, password) {
        var defer = Q.defer();
        var _this = this;

        var userData = {
            'username': username,
            'password' : password
        }

        this._requester.post('users', userData).then(function(data) {
            var roleData = {
                "users":
                    {
                        "__op": "AddRelation",
                        "objects":
                            [
                              {
                                  "__type": "Pointer",
                                  "className": "_User",
                                  "objectId": data.objectId
                              }
                            ]
                    }
            }

            _this._requester.put('roles/' + _this._userRoleId, roleData).then(function (data) {
                defer.resolve(data);
            }, function(error) {
                defer.reject(error);
            });

        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    /*
     * Not complete.
     */
    ServerManager.prototype.currentUserInfo = function() {
        var defer = Q.defer();
        this._requester.get('users/me')
            .then(function(data) {
                defer.resolve(data);
            }, function(error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    /*
     * Use to identify whether the current user (checked via the session ID) is an admin
     * Returns a promise, which can either contain true or false (If every request went ok).
     */
    ServerManager.prototype.isValidAdmin = function() {
        var _this = this;
        return identifyRole(_this, this._adminRoleId);
    }

    /*
     * Use to identify whether the current user (checked via the session ID) is a valid user
     * Returns a promise, which can either contain true or false (If every request went ok).
     */
    ServerManager.prototype.isValidUser = function () {
        var _this = this;
        return identifyRole(_this, this._userRoleId);
    }

    ServerManager.prototype.vote = function(id, voteType) {
        var defer = Q.defer();
        var data = {
            id : id,
            voteType : voteType,
            user : localStorage.username
        };

        this._requester.post('functions/vote', data)
            .then(function(successData){
                defer.resolve(successData);
            }, function(error){
                defer.reject(error);
            });

        return defer.promise;
    };

    ServerManager.prototype.viewPage = function (id) {
        var defer = Q.defer();
        var data = {
            id: id,
            user: localStorage.username
        };

        this._requester.post('functions/makeView', data)
            .then(function (successData) {
                defer.resolve(successData);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    function identifyRole(_this, roleId) {
        var defer = Q.defer();

        var whereParameter = '?where={' +
                                '"$relatedTo":' +
                                    '{"object":' +
                                        '{"__type":"Pointer",' +
                                        '"className":"_Role",' +
                                        '"objectId":"' + roleId + '"},' +
                                        '"key":"users"}}';

        _this._requester.get('sessions/me')
            .then(function (userData) {

                _this._requester.get('users' + whereParameter)
                    .then(function (roleData) {
                        for (var user in roleData.results) {
                            if (roleData.results[user].objectId === userData.user['objectId']) {
                                defer.resolve(true);
                                return;
                            }
                        }

                        defer.reject(false);
                    }, function (error) {
                        defer.reject(error);
                    });
            }, function (error) {
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