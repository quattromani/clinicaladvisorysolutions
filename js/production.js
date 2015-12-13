var smallBreakPoint = 640;
var mediumBreakPoint = 768;

function equalHeight(group) {
  if ($(window).width() > mediumBreakPoint) {
    var tallest = 0;
    group.each(function() {
      var thisHeight = $(this).outerHeight();;
      if(thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    group.height(tallest);
  } else {

  }
}

$(document).ready(function() {
  if ($(window).width() > mediumBreakPoint) {
    equalHeight($('.card'));
  }
});

// Add classes to first and last li's for every instance
$(function() {
  // Add classes to first and last of each list
  $('li:first-child').addClass('js-first');
  $('li:last-child').addClass('js-last');
});

// Make room for the fixed header
headerHeight = $('header[role=banner]').outerHeight();
navHeight = $('nav[role=navigation]').outerHeight();

$(function() {
  $(".open-panel").click(function(){
    if($('html').hasClass('open-nav')) {
      $('html').removeClass('open-nav');
    } else {
      $('html').addClass('open-nav');
      $('.wrap').css('margin-top', 0);
    }
    $(this).toggleClass('active');
  });
});

$(function() {
  if ($(window).width() > mediumBreakPoint) {
    $('.banner').css('margin-top', headerHeight);
  } else {
    $('.banner').css('margin-top', headerHeight);
  }
});

$(document).ready(function(){
	revealFooter();
});

$(window).on("resize", function(event) {
	revealFooter();
});

function revealFooter() {
	reveal = $('footer[role=contentinfo]').outerHeight();

	$('.reveal-wrapper').css({'margin-bottom': reveal});
	$('footer[role=contentinfo]').css({'height': reveal + 10});
}

// Make room for the fixed header
headerHeight = $('header[role=banner]').outerHeight();

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
           scrollTop: target.offset().top - headerHeight
      }, 1000);
      return false;
    }
  }
});
