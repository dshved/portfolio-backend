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

//add__work.addEventListener('click', function(e) {

  // e.preventDefault();
  // var data = {
  //   name: work_name.value,
  //   skill: work_skill.value,
  //   images: images.value
  // }
  // console.log(data);
  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', '/admin/saveWork');
  // xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
  // xhr.send(JSON.stringify(data));

  // var form = document.forms.saveWork;

  // var formData = new FormData(form);

  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "/admin/saveWork");

  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == 4) {
  //     if (xhr.status == 200) {
  //       data = xhr.responseText;
  //       if (data == "true") {
  //         $("body").replaceWith("<p>Принято!<p>");
  //       } else {
  //         $("body").replaceWith("<p >Ошибка! Обновите страницу...<p>");
  //       }
  //     }
  //   }
  // };

  // xhr.send(formData);
//});
