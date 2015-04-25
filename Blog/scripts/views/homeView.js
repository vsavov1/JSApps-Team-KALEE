var app = app || {};

app.homeView = (function() {
    function HomeView(selector, data, clearDiv) {
        console.log(clearDiv);
        if (clearDiv) {
            $(selector).empty();
            $('#rightSide').empty();
            $('#center').empty();

            $("#leftSide").append($("<h1 id='topPost'>Top posts</h1>"));
            $.get('templates/largePost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).append(output);

            });
        } else {
            $("#leftSide").append($("<hr></hr>"));

            $("#leftSide").append($("<h1 id='topPost'>Newest posts</h1>"));
            $.get('templates/largePost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).append(output);
            });
        }
		// Sample solution using mustache - not necessary, can do it with DOM Manipulation as well.
    }

    return {
        load: function (selector, data, clearDiv) {
            return HomeView(selector, data, clearDiv);
        }
    }
}());