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
  document.getElementById("blog_add").reset();
});


$('#saveWork').submit(function() {
  $(this).ajaxSubmit({
    error: function(xhr) {
      status('Error: ' + xhr.status);
    },
    success: function(response) {
      _errorMessage(response);
      document.getElementById("saveWork").reset();
    }
  });
  return false;
});


$('#delPost').on('click', function(e){
  e.preventDefault();
  var id = $( "#post_list option:selected" ).data('id');
  $.ajax({
    url: '/admin/removePost',
    type: 'post',
    data: {id: id.substring(1, id.length - 1 )},
    success: function(res) {
      _errorMessage(res);
      $( "#post_list option:selected" ).remove();
    }
  });
});

$('#delWork').on('click', function(e){
  e.preventDefault();
  var id  = $( "#work_list option:selected" ).data('id');
  $.ajax({
    url: '/admin/removeWork',
    type: 'post',
    data: {id: id.substring(1, id.length - 1 )},
    success: function(res) {
      _errorMessage(res);
      $( "#work_list option:selected" ).remove();
    }
  });
})