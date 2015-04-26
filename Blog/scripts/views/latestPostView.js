var app = app || {};

app.latestPostView = (function() {

    function LatestPostView(selector, data, type) {
            $("#rightSide").append($("<h1 id='newestPost'>Newest posts</h1>"));
            $.get('templates/smallPost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).append(output);
            });
    }

    return {
        load: function (selector, data, type) {
            return LatestPostView(selector, data, type);
        }
    }
}());