var app = app || {};

app.serverManager = (function() {
    function ServerManager(baseUrl) {
        this._requester = app.requester.load(baseUrl);
        this.postsRepo = {
            posts: []
        };
    }

    ServerManager.prototype.getPosts = function (start, length) {
        var deffer = Q.defer();
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

            deffer.resolve(_this.studentsRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };

    // Get Post - load a concrete post and all its comments

    // Create a new post:
    // (When logged in only! - add security in the server and don't allow new post screen to show up)

    // Edit a post

    // Login user

    // Logout user


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