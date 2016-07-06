//Валидация форм авторизации и отправки сообщений
var validateForm = (function() {

  function init() {
    _setUpListners();
  }

  function _setUpListners() {
    //$('#auth').submit(_auth);
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

  //функция проверки корректно введенного email
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  //удаление лишних пробелов
  function replaceSpace(value) {
    var reg_pusto = value.replace(/[\s{2,}]+/g, ' ');
    if (reg_pusto === '' || reg_pusto === ' ') {
      return true;
    } else {
      return false;
    }

  }



  function _validateMessageForm() {
    var $this = $(this),
      form = $('#feedback'),
      user_name = form.find('#user_name'),
      user_email = form.find('#user_email'),
      msg_text = form.find('#msg_text'),
      obj = {};
    var validEmail = isEmail(user_email.val());

    if (replaceSpace(user_name.val()) || replaceSpace(user_email.val()) || replaceSpace(msg_text.val())) {
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

    if (replaceSpace(user_login.val()) || replaceSpace(user_pass.val())) {
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
      // var xhr = new XMLHttpRequest();
      // var data = {login: 'admin', password: 'admin'};
      // xhr.open('POST', '/auth');
      // xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
      // xhr.onload = function() {
      //   console.log(xhr.respotse);
      // }
      // xhr.send(JSON.stringify(data));
      //location.href = 'admin';
      // document.getElementById("auth").reset();
    } else {
      _errorMessage(result['message']);

    }
  }


  return {
    init: init
  }
})();

validateForm.init();
