let flag = true;
let flagBanner = true;

// check visible countdown
function detect_visibilityCountdown() {
  const top_of_element = $('#count').offset().top;
  const bottom_of_element = $('#count').offset().top + $('#count').outerHeight();
  const bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  const top_of_screen = $(window).scrollTop();
  if (bottom_of_screen > top_of_element && top_of_screen < bottom_of_element) {
    countDown();
  }
}

function detect_visibilityBanner() {
  const top_of_element = $('#banner').offset().top;
  const bottom_of_element = $('#banner').offset().top + $('#banner').outerHeight();
  const bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  const top_of_screen = $(window).scrollTop();
  if (bottom_of_screen > top_of_element && top_of_screen < bottom_of_element) {
    $('.banner__content__background').addClass('banner__content__background-toogle');
    flagBanner = false;
  }
}
detect_visibilityBanner();

$(window).scroll(function () {
  // check only first scroll show element
  if (flag) {
    detect_visibilityCountdown();
  }
  if (flagBanner) {
    detect_visibilityBanner();
  }
});

function countDown() {
  flag = false;
  $('.our-news-countdown-number').each(function () {
    let $this = $(this),
      countTo = $this.attr('data-count');

    $({ countNum: $this.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 2000,
        easing: 'linear',
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
        },
      },
    );
  });
}

$('#btn-to-top').click(function () {
  $('html, body').animate({ scrollTop: 0 }, '2500');
});
