var app = app || {};

// Demonstrating poppy.js library as well as registering.

var manager = app.serverManager.load(app.requester.load('https://api.parse.com/1/'));
// manager.newPost('some', 'post', 'random').then(function(data) {
//     
// }, function(error) {
//     poppy.pop('success', 'Error', error.statusText);
//     poppy.pop('error', 'Error', error.statusText);
// }).done();

// manager.register('pesho', 'tosho').then(function(data) {
//     poppy.pop('success', 'Success', 'Successfully registered');
// }, function(error) {
//     poppy.pop('error', 'Error', error.statusText);
// })
// if (localStorage['logged-in']) {
//     manager.logout();
// }
// manager.login('mihayloff', 'developer').then(function(data) {
//     console.log(data);
// }, function(error) {
//     console.log(error);
// });
manager.isValidAdmin().then(function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});

(function() {
    var model = app.serverManager.load(app.requester.load('https://api.parse.com/1/'));
    var controller = app.controller.load(model);

    app.router = Sammy(function () {
        var selector = '#center';
        var leftBox = '#leftSide';
        var rightBox = '#rightSide';

        this.get('#/', function () {
            controller.getAdminPage(leftBox);
            // Controller - Get homepage

            // Add ways to sort posts by get parameter
        });

        this.get('#/Login', function () {
            controller.getLoginPage(selector);
        });

         this.get('#/Register', function () {
            controller.getRegisterPage(selector);
        });

        this.get('#/Post/:id', function (data) {
            // Controller - Get Post page
            var id = data['params'].id;
            controller.getSinglePostPage(selector, id);

        });

        this.get('#/Create', function () {
            // Controller - Get create new post page
        });
    });

    app.router.run('#/');
}());