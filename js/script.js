  
$(document).ready(function(){

  $('.slider__item').slick({
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right solid.png"></button>',
      responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false
            }
        }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog__contents').eq(i).toggleClass('catalog__contents_active');
        $('.catalog__list').eq(i).toggleClass('catalog__list_active');
    })
    });
  };
  toggleSlide('.catalog__link');
  toggleSlide('.catalog__back');

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.button__mini').each(function(i) {
    $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
  });

  $('input[name=tel]').mask("+7 (999) 999-9999");

  function validate(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        tel: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите минимум {0} символа!")
        },
        tel: {
          required:"Пожалуйста, введите свой номер телефона",
          tel:"Проверьте правильность номера"
        },
        email: {
          required: "Пожалуйста, введите свой электронный адрес",
          email: "Проверьте корректность введенных данных"
        }
      }
    });
  }

  validate('#consultation-form');
  validate('#consultation form');
  validate('#order form');

  $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut('slow');
        $('.overlay, #thanks').fadeIn('slow');


        $('form').trigger('reset');
      });
      return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1200) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

  new WOW().init();
});
