var app = app || {};

app.postView = (function() {
    function PostView(selector, data) {
        $.get('templates/post.html', function(template) {
            $('#leftSide').empty();
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            return new PostView(selector, data);
        }
    }
}());

// This should be the Post view model. Rename the file later