$('a').each(function() {
  var a = new RegExp('/' + window.location.host + '/');
  if(!a.test(this.href)) {
    $(this).click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      window.open(this.href, '_blank');
    });
  }
});

var smallBreakPoint = 640;
var mediumBreakPoint = 768;

 /* ==========================================================================
    Styleguide -- Version: 0.4.1 - Updated: 2/22/2014
    ========================================================================== */

// Create Hex color code from color return
function hexc(colorval) {
	var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	delete(parts[0]);
	for (var i = 1; i <= 3; ++i) {
		parts[i] = parseInt(parts[i]).toString(16);
		if (parts[i].length == 1) parts[i] = '0' + parts[i];
	}
	color = '#' + parts.join('');
}

// Get color value of swatch and print to div
var color = '';
$('.swatch').each(function() {
	var classList = $(this).children('.swatch-color').attr('class').split(' ');
	for(i=0; i <= classList.length-1; i++){
		if(classList[i].match(/color-/g)){
			$(this).children('.swatch-info').prepend('<p>$' + classList[i] + '</p>');
			break;
		}
	}
	var x = $(this).children('.swatch-color').css('backgroundColor');
	hexc(x);
	$(this).children('.swatch-info').append('<p>' + color + '</p>');
	$(this).children('.swatch-info').append('<p>' + x + '</p>');
});

(function($) {

	$.fn.vs = function() {
        // View source buttons
        $('.vs').click(function(){
        	$(this).parent().next().find('.prettyprint').toggle();
        	$(this).not('.disabled').toggleClass('js-active');
        	return false;
        });
      }

    }(jQuery));

$('.vs').vs();

// Get font-family property and return
$('.fonts').each(function(){
	var fonts = $(this).css('font-family');
	$(this).prepend(fonts);
});



// Make room for the fixed header
navHeight = $('nav').height();

$('a[href*=#]:not([href=#])').click(function() {

  var windowWidth = $("body").width();
  var offset = windowWidth > 1020 ? $('nav') : $('header[role=banner]');
  var offset_height = offset.outerHeight();

  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    || location.hostname == this.hostname) {

    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
     if (target.length) {
       $('html,body').animate({
           scrollTop: target.offset().top - navHeight
      }, 1000);
      return false;
    }
  }
});
