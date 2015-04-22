
$(document).ready(function(e){
   $('#menuButton').on('click',function(){
      $('#dropDownMenu').slideToggle();
   });
})

$(document.body).mouseup(function(event) {
	var target = $(event.target);
	if (!target.parents().andSelf().is('#dropDownMenu') 
		&& !($('#dropDownMenu').css('display') == 'none')) { 
		$('#dropDownMenu').slideToggle();
	 }
});

$(window).scroll(function (event) {
	$('#dropDownMenu').slideUp(); // to fix bug with scroll
});
