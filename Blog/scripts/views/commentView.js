var app = app || {};

app.commentView = (function() {
    function CommentView(selector, data) {
        $.get('templates/comment.html', function(template) {

            var output = Mustache.render(template, data);
            $(selector).append(output);
            $('#commentContent').val('');
        });
    }

    return {
        load: function (selector, data) {
            return new CommentView(selector, data);
        }
    }
}());
