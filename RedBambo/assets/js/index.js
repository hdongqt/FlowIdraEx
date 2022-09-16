$(function () {
  var lastScrollTop = 0,
    delta = 5;
  $(window).scroll(function () {
    var nowScrollTop = $(this).scrollTop();
    if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
      if (nowScrollTop > lastScrollTop) {
        let scroll = this.scrollY;
        if (scroll >= 400) {
          $('#header').addClass('header-scroll-down');
        }
      } else {
        $('#header').removeClass('header-scroll-down');
      }
      lastScrollTop = nowScrollTop;
    }
  });
});
const handelPlayVideoEvalate = () => {
  const evalateItem = $('.evalate__item');
  const evalateItem1 = $('.evalte__item-video');
  let i = 0;
  evalateItem.each(function () {
    const s = $(this).children('.evalte__item-video');
    $(this).mouseenter(function () {
      s.get(0).play();
    });
    $(this).mouseleave(function () {
      s.get(0).pause();
    });
  });
};
handelPlayVideoEvalate();

const listEvalte = [
  {
    video: './assets/videos/video4.mp4',
    content: `
    Give us all of that cheesy crispy vegan Crab Rangoon 🦀😋 #vegan #vegancrabrangoon #vegansofig
    #vegansofnewyork #veganlife #veganeats #nyc #vegano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
  {
    video: './assets/videos/video5.mp4',
    content: `
   dfeganlife #veganeats #nyc #vegano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
  {
    video: './assets/videos/video6.mp4',
    content: `
   fdfdfdfrabrangoon #vegansofig
    #vegansofnewyork #veganlife #veganeats #nyc #vegano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
  {
    video: './assets/videos/video1.mp4',
    content: `
    1111Gfdfdfdfdfqqk #veganlife #veganeats #nyc #vegano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
  {
    video: './assets/videos/video5.mp4',
    content: `
   22222gano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
  {
    video: './assets/videos/video4.mp4',
    content: `
    ats #nyc #vegano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
  {
    video: './assets/videos/video2.mp4',
    content: `
    Give us all of that cheesy crispy vegan Crab Rangoon 🦀😋 #vegan #vegancrabrangoon #vegansofig
    #vegansofnewyork #veganlife #veganeats #nyc #vegano #veganlife #friedwonton #vegancheese #vegancrab
    #redbamboonyc
  `,
  },
];
let indexEvalate = 0;
$('#btn-loadEvalate').click(function () {
  if (indexEvalate < listEvalte.length - 3) {
    const html = listEvalte
      .slice(indexEvalate, indexEvalate + 3)
      .map((item) => {
        return `<div class="evalate__item">
      <div class="evalate__item-icon">
        <img src="./assets/images/film.png" alt="film" class="evalate__item-icon__img" />
      </div>
      <video src="${item.video}" loop muted class="evalte__item-video"></video>
      <div class="evalate__item-content">
        <p>${item.content}</p>
      </div>
    </div>`;
      })
      .join('');
    $('.evalate__list').append(html);
    handelPlayVideoEvalate();
    indexEvalate += 3;
  }
});
