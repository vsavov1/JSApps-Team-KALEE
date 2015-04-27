var app = app || {};

app.homeView = (function() {
    function HomeView(selector, data, type) {
        
        if (type == "topPosts") {
            $(selector).empty();
            $('#rightSide').empty();
            $('#center').empty();

            $("#leftSide").html($("<h1 id='topPost'>Top posts</h1>"));
            $.get('templates/largePost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);

            });
        } 

        if (type == "newPosts") {
            $("#leftSide").append($("<hr></hr>"));

            $("#leftSide").append($("<h1 id='topPost'>Newest posts</h1>"));
            $.get('templates/largePost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).append(output);
            });
        }

        if (type == "mostViewedPosts") {
            $("#leftSide").append($("<hr></hr>"));

            $("#leftSide").append($("<h1 id='mostViewedPosts'>mostViewedPosts</h1>"));
            $.get('templates/mediumPost.html', function(template) {
                var output = Mustache.render(template, data);
                $(selector).append(output);
            });
        }

        $("#searchButton").unbind('click').click(function () {
            if($("#menuLinks").length && !$("#searchInput").length){
                $("#menuLinks").hide();
                $("#dropDownMenu").append($("<input id='searchInput' type='text'></input>"))
                $("#dropDownMenu").append($("<span id='mock-cursor'>|</span>"))
            }
            if ($("#searchInput")) {
                app.model.search($("#searchInput").val())
                .then(function (data) {
                    if (data.posts.length == 0) {
                        poppy.pop('error', 'No search results', 'Please try again :)');
                    } else {
                        console.log(data);
                        $('#dropDownMenu').slideUp();
                        $("#leftSide").empty();
                        $('#rightSide').empty();
                        $('#center').empty();
                        $("#menuLinks").show();
                        $("#searchInput").remove();
                        $("#mock-cursor").remove();

                        $.get('templates/searchResults.html', function(template) {
                            var output = Mustache.render(template, data);
                            $(selector).append(output);
                        });
                    }
                }, function (error) {
                    console.log("err");
                });
            }


        })
        // Sample solution using mustache - not necessary, can do it with DOM Manipulation as well.
    }

    return {
        load: function (selector, data, type) {
            return HomeView(selector, data, type);
        }
    }
}());