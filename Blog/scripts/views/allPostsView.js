var app = app || {};

app.allPostsView = (function() {
    function AllPostsView(selector, data) {
        $.get('templates/searchResults.html', function(template) {
            $("#leftSide").empty();
            $('#rightSide').empty();
            $('#center').empty();

            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load: function(selector, data) {
            return new AllPostsView(selector, data);
        }
    }
})();