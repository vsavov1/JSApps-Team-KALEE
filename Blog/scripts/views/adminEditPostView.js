var app = app || {};

app.adminEditPostView = (function() {
    function AdminEditPostView(selector, data) {
        $('#leftSide').empty();
        $('#rightSide').empty();
        $('#center').empty();
        $.get('templates/adminPostEdit.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
        //$("#leftSide").append($("<h1 id='topPost'>Top posts</h1>"));
        //$.get('templates/admin.html', function(template) {
        //    var output = Mustache.render(template, data);
        //   $(selector).append(output);
        //});

        // Sample solution using mustache - not necessary, can do it with DOM Manipulation as well.
    }

    return {
        load: function (selector, data) {
            return AdminEditPostView(selector, data);
        }
    }
}());