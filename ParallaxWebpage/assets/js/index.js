let flag = false;
let index = 0;
const parallaxList =$(".parallax")

$(window).bind('mousewheel', function(event) {
    if (flag != true) {
        flag = true;
    if (event.originalEvent.wheelDelta >= 0) {
        // up
        if (index > 0) {
          index--;
        parallaxList.eq(index).removeClass("scroll-down").addClass("scroll-up");
        }
    }
    else {
       //down
      if (index < 2) {
        index++;
        parallaxList.eq(index - 1).removeClass("scroll-up").addClass("scroll-down");
      }
    }
    handelDelayScroll()
}
});

const handelDelayScroll = () =>{
  setTimeout(function() {
    flag = false;
  }, 800);
}