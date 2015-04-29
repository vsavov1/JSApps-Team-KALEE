var app = app || {};

app.getTagsView = (function() {
    function TagsView(selector, data) {
            $(selector).append($("<h1 id='tags'>Tags</h1>"));
            var tagContainer = $("<div id='tagsContainer'></div>");

            for(var tag in data){
                tagContainer.append($("<div class='tag'><a href='#/search'>" +   tag + "</a></div>"));


            }

            $(selector).append(tagContainer);

           
            $('.tag').click(function() {
                var content = $(this).text();
                app.model.search(content)
                 .then(function (data) {
                    if (data.posts.length == 0) {
                        poppy.pop('error', 'No search results', 'Please try again :)');
                    } else {
                        $('#dropDownMenu').slideUp();
                        $("#leftSide").empty();
                        $('#rightSide').empty();
                        $('#center').empty();
                        $("#menuLinks").show();
                        $("#searchInput").remove();
                        $("#mock-cursor").remove();
                        $.get('templates/searchResults.html', function(template) {
                            var output = Mustache.render(template, data);
                            $('#center').append(output);
                        });
                    }
                }, function (error) {
                    console.log("err");
                });

           });

    }

    return {
        load: function (selector, data) {
            return TagsView(selector, data);
        }
    }
}());