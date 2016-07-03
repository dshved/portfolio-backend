var myModule = (function() {
  'use strict';

  var init = function() {
    _setUpListners();
  };

  var _setUpListners = function() {
    $('.login-btn').on('click', _showLogin);
    $('.btn-index').on('click', _showInfo);
    $('.index').on('click', _showInfo);
    $('.wrapper.bg').on('click', _backgroundClick);
  };

  var _showLogin = function(e) {
    e.preventDefault();
    $('.flip').toggleClass('flipping');
    $('.login-btn').css({
      'visibility': 'hidden'
    });
  };

  var _showInfo = function(e) {
    e.preventDefault();
    $('.flip').removeClass('flipping');
    $('.login-btn').css({
      'visibility': 'visible'
    });
  };

  var _backgroundClick = function(e) {
    if (e.target.className == 'wrapper bg') {
      $('.flip').removeClass('flipping');
      $('.login-btn').css({
        'visibility': 'visible'
      });
    }
  };

  return {
    init: init
  }
})();

myModule.init();

//Смещение background
// $(function() {
//   var x = 0;
//   setInterval(function() {
//     x -= 1;
//     $('.wrapper').css('background-position', x + 'px 0');
//   }, 50);
// })


$(document).ready(function() {

  $('.tabs__control-link').on('click', function(e) {
    e.preventDefault();
    var item = $(this).closest('.tabs__controls-item'),
      contentItem = $('.tabs__item'),
      itemPosition = item.index();
    contentItem.eq(itemPosition)
      .add(item)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });







  //Медленный скролл
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //Spinner
  setTimeout(function() {
    $("#page-preloader").fadeOut("slow");
    $(".bg").css('visibility', 'visible');
  }, 4000);

  $('.counter').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now) + '%');
      }
    });
  });

  //Меню навигации
  $('#nav-icon').click(function() {
    $('body').toggleClass('overflow');
    $(this).toggleClass('open');
    $('#overlay').toggleClass('open');
  });

  //Sidebar
  $('.sidebar__inner').click(function() {
    $('.sidebar').toggleClass('sidebar__active');
  });


  //Sidebar blog
  var sidebar = $('.sidebar__inner');
  var top = sidebar.offset().top - parseFloat(sidebar.css('margin-top'));

  $(window).scroll(function(event) {
    var y = $(this).scrollTop();
    if (y >= top) {
      sidebar.addClass('fixed');
    } else {
      sidebar.removeClass('fixed');
    }
  });


});



//validation
var validateForm = (function() {

  function init() {
    _setUpListners();
  }

  function _setUpListners() {
    $('#auth').submit(_auth);
    $('#feedback').submit(_sendMessage);
    $('#user_human').click(_check);
    $('body').on('click', '.error__close', _closeMsg);
  }

  function _sendMessage(e) {
    e.preventDefault();
    var result = _validateMessageForm();

    if (result === true) {
      _errorMessage('Ваше сообщение успешно отправлено!');
      document.getElementById("feedback").reset();
    } else {
      _errorMessage(result['message']);

    }

  }


  function _closeMsg(e) {
    e.preventDefault();
    $('.error').remove();
    $('body').css('overflow', 'auto');
  }

  function _check() {

    if ($(this).is(':checked')) {
      $('#human_yes').prop("disabled", false);
      $('#human_no').prop("disabled", false);
    } else {
      $('#human_yes').prop("disabled", true);
      $('#human_no').prop("disabled", true);
    }

  }

  function _errorMessage(message) {
    var msg = '<div class="error">' +
      '<div class="error__container">' +
      '<a href="#" class="error__close">' +
      '<i class="fa fa-times-circle" aria-hidden="true"></i></a>' +
      '<div class="error__message">' + message + '</div></div></div>';
    $('body').prepend(msg);
    $('.error').css('top', $('body').scrollTop() + 'px');
    $('body').css('overflow', 'hidden');
  };

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function _validateMessageForm() {
    var $this = $(this),
      form = $('#feedback'),
      user_name = form.find('#user_name'),
      user_email = form.find('#user_email'),
      msg_text = form.find('#msg_text'),
      obj = {};
    var validEmail = isEmail(user_email.val());

    if (user_name.val() === '' || user_email.val() === '' || msg_text.val() === '') {
      obj.valid = false;
      obj.message = "Вы заполнили не все поля!";
      return obj;
    }
    if (!validEmail) {
      obj.valid = false;
      obj.message = "Введите корректный Email!";
      return obj;
    }

    return true;

  }


  function _validateAuthForm() {
    var $this = $(this),
      form = $('#auth'),
      user_login = form.find('#user_login'),
      user_pass = form.find('#user_pass'),
      user_human = form.find('#user_human'),
      human_yes = form.find('#human_yes'),
      obj = {};

    if (user_login.val() === '' || user_pass.val() === '') {
      obj.valid = false;
      obj.message = "Вы заполнили не все поля!";
      return obj;
    }

    if (!user_human.prop('checked') || !human_yes.prop('checked')) {
      obj.valid = false;
      obj.message = "Роботам тут не место!";
      return obj;
    }

    return true;

  }

  function _auth(e) {
    e.preventDefault();
    var form = $('#auth'),
      result = _validateAuthForm();

    if (result === true) {
      location.href = 'admin';
      document.getElementById("auth").reset();
    } else {
      _errorMessage(result['message']);

    }
  }


  return {
    init: init
  }
})();

validateForm.init();



//Slider Module
var Slider = (function() {
  var currentImg = 1;

  function init() {
    _setUpListners();
  }

  function _setUpListners() {
    $('.slider__link-right').on('click', _nextSlide);
    $('.slider__link-left').on('click', _prevSlide);
  }

  function _nextImg() {
    var container = $('.slider__next'),
      items = container.find('.slider__item'),
      activeItem = container.find('.slider__item.active');
    var reqItem = items.eq(currentImg - 2);

    activeItem.animate({
      'bottom': '100%'
    }, 300);

    reqItem.animate({
      'bottom': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('bottom', '-100%');
      $(this).addClass('active');
    });
  }

  function _prevImg() {
    var container = $('.slider__prev'),
      items = container.find('.slider__item'),
      activeItem = container.find('.slider__item.active');
    var reqItem = items.eq(currentImg - 2);

    activeItem.animate({
      'top': '100%'
    }, 300);
    reqItem.animate({
      'top': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('top', '-100%');
      $(this).addClass('active');
    });
  }

  function _nextSlide(e) {
    e.preventDefault();
    var bigSlide = $('.slider__center'),
      img = bigSlide.find('img');
    var container = $('.slider__next');
    var items = container.find('.slider__item'),
      activeItem = container.find('.slider__item.active');

    var slider_info = $('.slider__info');
    var slider_info_items = slider_info.find('.slider__info-item');
    var slider_info_active = slider_info.find('.slider__info-item.active');


    currentImg++;
    if (currentImg >= items.length) {
      currentImg = 0;
    }

    var reqItem = items.eq(currentImg),
      reqInfo = slider_info_items.eq(currentImg-1);
    reqImg = items.eq(currentImg - 1).find('img');

    activeItem.animate({
      'bottom': '100%'
    }, 300);

    img.css({ opacity: '0' });

    setTimeout(function() {
      img.attr('src', reqImg.attr('src'));
      img.css({
        opacity: '1',
        transition: 'all .3s'
      });
    }, 300);



    reqItem.animate({
      'bottom': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('bottom', '-100%');
      slider_info_active.removeClass('active');
      reqInfo.addClass('active');
      $(this).addClass('active');
    });
    _prevImg();
  }

  function _prevSlide(e) {
    e.preventDefault();
    var bigSlide = $('.slider__center'),
      img = bigSlide.find('img');
    var container = $('.slider__prev');
    var items = container.find('.slider__item'),
      activeItem = container.find('.slider__item.active');

    var slider_info = $('.slider__info');
    var slider_info_items = slider_info.find('.slider__info-item');
    var slider_info_active = slider_info.find('.slider__info-item.active');

    currentImg--;
    var reqItem = items.eq(currentImg),
      reqImg = items.eq(currentImg + 1).find('img');
      reqInfo = slider_info_items.eq(currentImg);
    if (currentImg < 0) {
      currentImg = items.length - 1;
    }

    activeItem.animate({
      'top': '100%'
    }, 300);

    img.css({ opacity: '0' });

    setTimeout(function() {
      img.attr('src', reqImg.attr('src'));
      img.css({
        opacity: '1',
        transition: 'all .3s'
      });
    }, 300);

    reqItem.animate({
      'top': '0%'
    }, 300, function() {
      activeItem.removeClass('active').css('top', '-100%');
      slider_info_active.removeClass('active');
      reqInfo.addClass('active');
      $(this).addClass('active');
    });
    _nextImg();
  }

  return {
    init: init
  }
})();

Slider.init();

save__skill.addEventListener('click', function(e) {
  e.preventDefault();
  var data = {
    html: skill_html.value,
    css: skill_css.value,
    js: skill_js.value,
    git: skill_git.value,
    gulp: skill_gulp.value,
    bower: skill_bower.value,
    php: skill_php.value,
    mysql: skill_mysql.value,
    nodejs: skill_nodejs.value,
    mongodb: skill_mongodb.value,
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/admin/saveSkill');
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
  xhr.send(JSON.stringify(data));
});


add__article.addEventListener('click', function(e) {
  e.preventDefault();
  var data = {
    title: blog_name.value,
    date: blog_date.value,
    text: blog_text.value
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/admin/savePost');
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
  xhr.send(JSON.stringify(data));
});

// add__work.addEventListener('click', function(e) {
//   e.preventDefault();
//   var data = {
//     name: work_name.value,
//     skill: work_skill.value,
//     image: file.value
//   }
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/admin/saveWork');
//   xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
//   xhr.send(JSON.stringify(data));
// });
