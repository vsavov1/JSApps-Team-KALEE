var app = app || {};

app.postView = (function() {
    function PostView(selector, data) {
        $.get('templates/postView.html', function(template) {
            $("#leftSide").empty();
            $('#rightSide').empty();
            $('#center').empty();
            var output = Mustache.render(template, data);
            $(selector).html(output);
            if (localStorage["logged-in"]) {
                $('#commentSend').click(function () {
                    app.model.currentUserInfo().then(function (successData) {
                        var splitted = window.location.href.split('/');
                        var content = $('#commentContent').val();
                        app.model.postComment(splitted[splitted.length - 1], successData.username, content)
                            .then(function (data) {
                                var splitted = window.location.href.split('#');
                                window.location.replace(splitted[0] + '#/');
                                poppy.pop('success', 'Comment posted successfully!',
                                                'Your comment has been posted successfully');
                            }, function (error) {
                                poppy.pop('error', 'Error',
                                                'An error ocurred while trying to post your comment.' +
                                                ' Please try again later.');
                            });
                    }, function (error) {
                        poppy.pop('error', 'Error', 'An error ocurred while trying to post your comment.' +
                            ' Please try again later.');
                    });
                });   
            }
        });
    }

    return {
        load: function (selector, data) {
            return new PostView(selector, data);
        }
    }
}());

// This should be the Post view model. Rename the file later