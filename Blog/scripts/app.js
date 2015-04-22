var app = app || {};

/* Deleting posts
 
var manager = app.serverManager.load('https://api.parse.com/1/');
manager.deletePost('7DNlNO8ujT');

*/

/*
Testing posts

var post = new Post('1', 'ass', 'some', 'me');
var post1 = new Post('2', 'some', 'aa', 'gg');
console.log(post.title);
console.log(post1.title);

var a = app.serverManager.load('https://api.parse.com/1/');
a.getPosts().then(function(data) {
    for (var post in data.posts) {
        console.log(data.posts[post]);
    }
});

var manager = app.serverManager.load('https://api.parse.com/1/');
manager.getPost('7DNlNO8ujT').then(function(post) {
    console.log(post);
});

*/

// Testing some of the classes

/* 
var a = app.requester.load('https://api.parse.com/1/');

a.get('login?username=mihayloff&password=qwerty')
    .then(function (data) {
    sessionStorage["logged-in"] = data.sessionToken;
    a.post('logout')
        .then(function () {
            console.log('success');
    });
}); 

*/


/* 

var manager = app.serverManager.load('https://api.parse.com/1/');
manager.getPost('lkPiqgeich').then(function(data) {
    console.log(data);
}); 

*/

/* Testing posting new post

var manager = app.serverManager.load('https://api.parse.com/1/');
manager.newPost('Something', 'strange', 'me');

*/

(function() {
    var model = app.serverManager.load('https://api.parse.com/1/');
    var controller = app.controller.load(model);

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            controller.getHomePage(selector);
            // Controller - Get homepage

            // Add ways to sort posts by get parameter
        });

        this.get('#/Login', function () {
            // Controller - Get Loginpage
        });

         this.get('#/Register', function () {
            controller.getRegisterPage("#leftSide");
        });

        this.get('#/Post/:id', function (data) {
            // Controller - Get Post page
            var id = data['params'].id;
            controller.getPost(selector, id);
        });

        this.get('#/Create', function () {
            // Controller - Get create new post page
        });
    });

    app.router.run('#/');
}());