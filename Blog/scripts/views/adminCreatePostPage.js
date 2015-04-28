var app = app || {};

app.adminCreatePostPage = (function() {
    function AdminCreatePostPage(selector) {
        $.get('templates/createPostPage.html', function(template) {
            $("#leftSide").empty();
            $('#rightSide').empty();
            $('#center').empty();

            var output = Mustache.render(template);
            $(selector).html(output);

            $('#addPost').on('click', function() {
                var postTitle = $('#titleField').val();
                var postText = $('#contentField').val();
                var author = localStorage['username'];
                var picUrl = $('#pictureField').val();
                var tags = $('#tags').val().split(/[, ]+/);
                
                app.model.newPost(postTitle, postText, author, picUrl, tags)
                    .then(function(data){
                        window.location = '#/Post/' + data.objectId;
                    }, function(error){
                        poppy.pop('error', 'Error', 'An error ocurred while trying to post your article.' +
                        ' Please try again later.');
                    });
            });
        });
    };

    return {
        load: function(selector) {
            return AdminCreatePostPage(selector);
        }
    }
})();