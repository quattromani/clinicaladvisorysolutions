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
  equalHeight($('.card'));
});
