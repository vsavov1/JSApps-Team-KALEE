var app = app || {};

app.homeView = (function() {
    function HomeView(selector, data) {
        $(selector).empty();
        $('#rightSide').empty();
        $('#center').empty();
        // $.get('templates/home.html', function(template) {
        //     var output = Mustache.render(template, data);
        //     $(selector).html(output);
        // });
        $("#leftSide").append($("<h1 id='topPost'>Top posts</h1>"));
        $.get('templates/largePost.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).append(output);
        });
		
		// Sample solution using mustache - not necessary, can do it with DOM Manipulation as well.
    }

    return {
        load: function (selector, data) {
            return HomeView(selector, data);
        }
    }
}());