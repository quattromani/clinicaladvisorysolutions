$(document).ready(function(){
	revealFooter();
});

$(window).on("resize", function(event) {
	revealFooter();
});

function revealFooter() {
	reveal = $('footer[role=contentinfo]').outerHeight();

	$('.reveal-wrapper').css({'margin-bottom': reveal});
	$('footer[role=contentinfo]').css({'height': reveal});
}
