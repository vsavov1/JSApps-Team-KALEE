var app = app || {};

// Demonstrating poppy.js library as well as registering.

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

(function() {
    var model = app.serverManager.load(app.requester.load('https://api.parse.com/1/'));
    app.model = app.serverManager.load(app.requester.load('https://api.parse.com/1/'));
    //Михайлов вчера за това те питах дали е ок този модел да се закачи за app, защото
    //няма как да го достъпя от друг файл, освен през самито. Примерно ако искам да 
    //закача евент на логин бутона мога
    var controller = app.controller.load(model);

    app.router = Sammy(function () {
        var selector = '#center';
        var leftBox = '#leftSide';
        var rightBox = '#rightSide';

        this.get('#/', function () {
            controller.getHomePage(leftBox); // TODO views for TOP/TRENDING post
            controller.getLatestPostView(rightBox);
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