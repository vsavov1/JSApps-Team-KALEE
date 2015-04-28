var app = app || {};

app.adminEditPostView = (function() {
    function AdminEditPostView(selector, data) {
        $('#leftSide').empty();
        $('#rightSide').empty();
        $('#center').empty();
        $.get('templates/adminPostEdit.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);

            $('#submitButton').click(function () {
                var title = $('#titleField').val();
                var content = $('#contentField').val();
                var author = $('#authorField').val();
                var tags = $('#tagsField').val().split(',');
                var pic = $('#pictureField').val();

                var splitted = window.location.href.split('/');
                app.model.editPost(splitted[splitted.length - 1], title, content, author, tags, pic)
                    .then(function (data) {
                        poppy.pop('success', 'Edit successful', 'You have edited the post successfully');
                        splitted = window.location.href.split('#');
                        window.location.replace(splitted[0] + '#/Admin');
                    }, function (error) {
                        poppy.pop('error', 'An error occured', error.statusText);
                    });
            });
        });
    }

    return {
        load: function (selector, data) {
            return AdminEditPostView(selector, data);
        }
    }
}());