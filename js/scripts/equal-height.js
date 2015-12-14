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

$(window).on('load resize', function () {
  if ($(window).width() > mediumBreakPoint) {
    equalHeight($('.card'));
  }
});
