var app = app || {};

app.homeView = (function() {
    function HomeView(selector, data) {
        // $.get('templates/home.html', function(template) {
        //     var output = Mustache.render(template);
        // 
        //     $(selector).html(output);
        // })
		
		// Sample solution using mustache - not necessary, can do it with DOM Manipulation as well.
    }

    return {
        load: function (selector, data) {
            return HomeView(selector, data);
        }
    }
}());