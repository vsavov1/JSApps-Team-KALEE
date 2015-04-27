var app = app || {};

app.getTagsView = (function() {
    function TagsView(selector, data) {
            $(selector).append($("<h1 id='tags'>Tags</h1>"));
            var tagContainer = $("<div id='tagsContainer'></div>");
            
            for(var tag in data){
                tagContainer.append($("<div class='tag'>" + tag + "</div>"));
            }

            $(selector).append(tagContainer);
    }

    return {
        load: function (selector, data) {
            return TagsView(selector, data);
        }
    }
}());