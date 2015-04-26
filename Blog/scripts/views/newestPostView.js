var app = app || {};

app.newestPostView = (function() {
                
    console.log("dsada");
    function NewestPostView(selector, data, type) {
            $("#rightSide").append($("<h1 id='newestPost'>Newest posts</h1>"));
            $.get('templates/smallPost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).append(output);
            });
    }

    return {
        load: function (selector, data, type) {
            return NewestPostView(selector, data, type);
        }
    }
}());