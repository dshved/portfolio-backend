//Переворачивание карточки на странице index
var Flip = (function() {
  'use strict';

  var init = function() {
    _setUpListners();
  };

  //Прослушка событий
  var _setUpListners = function() {
    $('.login-btn').on('click', _showLogin); //Click на кнопку "Авторизация"
    $('.btn-index').on('click', _showInfo); //Click на кнопку "На главную"
    $('.index').on('click', _showInfo); //Click на кнопку "На главную" на странице AUTH
    $('.wrapper.bg').on('click', _backgroundClick); //Click на background
  };

  var _showLogin = function(e) {
    e.preventDefault();
    $.ajax({
      url: './login',
      type: 'GET',
      success: function(res) {
        if (res == 'not ok') {
          $('.flip').toggleClass('flipping');
          $('.login-btn').css({
            'visibility': 'hidden'
          });
        } else {
          window.location.href = '/admin';
        }

      }
    })
  };

  var _showInfo = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/login',
      type: 'GET',
      success: function(res) {
        if (res == 'not ok') {
          $('.flip').toggleClass('flipping');
          $('.login-btn').css({
            'visibility': 'hidden'
          });
        } else {
          window.location.href = '/admin';
        };
      }
    });
  };

  //Переворачивание карточки при нажатии на background
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

Flip.init();
