$(document).on('scroll', function () {
  if ($(document).scrollTop() > 100) {
    console.log($('#header'));
    $('#header').addClass('header-scroll');
  } else {
    $('#header').removeClass('header-scroll');
  }
});
