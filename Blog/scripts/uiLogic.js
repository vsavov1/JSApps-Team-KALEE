var app = app || {};

$(document).ready(function(e){
   $('#menuButton').on('click',function(){
      $('#dropDownMenu').slideToggle();
      $("#menuLinks").show();
      $("#searchInput").remove();
      $("#mock-cursor").remove();
   });
});

$(document.body).mouseup(function(event) {
  var target = $(event.target);
  if (!target.parents().andSelf().is('#dropDownMenu') && !target.parents().andSelf().is('#menuButton')) { 
    $('#dropDownMenu').slideUp();
   }
});

$(window).bind('mousewheel', function(event) {
    if (!(event.originalEvent.wheelDelta >= 0)) {
    $('#dropDownMenu').slideUp();
    }
});
