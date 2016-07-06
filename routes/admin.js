var express = require('express');
var session = require('express-session');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');


var Skill = require('../models/skills').Skill;
var Post = require('../models/post').Post;
var Work = require('../models/work').Work;

var auth = function(req, res, next) {
  if (req.session && req.session.login === "admin" && req.session.password)
    return next();
  else
    return res.redirect('./auth');
};

router.get('/', auth, function(req, res) {
  if (auth) {
    Skill.find().then(function(skills) {
      if (skills.length < 1) {
        var data = {
          html: 0,
          css: 0,
          js: 0,
          git: 0,
          gulp: 0,
          bower: 0,
          php: 0,
          mysql: 0,
          nodejs: 0,
          mongodb: 0
        };
        res.render('admin', { data: data });
      } else {
        res.render('admin', { data: skills[0] });
      }

    });
  } else {
    res.redirect('./auth');
  }
});



router.post('/saveSkill', function(req, res, next) {
  console.log('****************save******************')
  Skill.find().then(function(skill) {
    console.log(req.body);
    if (skill.length >= 1) {
      Skill.update({ _id: skill[0]._id }, req.body, function() {
        console.log('Update id:', skill[0]._id)
      });
    } else {
      var skill = new Skill(req.body);
      skill.save();
    }

  });

  res.end();
});



router.post('/savePost', function(req, res, next) {
  var post = new Post(req.body);
  post.save();
  res.end();
});

router.post('/saveWork', function(req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var img = files.file[0];
    console.log(fields);
    fs.readFile(img.path, function(err, data) {
      var radom = Math.random().toString(36);
      var randomName = radom.substring(2, radom.length);

      var path = './public/upload/' + randomName + '-'+ img.originalFilename;

      fs.writeFile(path, data, function(err) {
        if (err) console.log(err);
        var data = {
          title: fields.name[0],
          stack: fields.skill[0],
          url_work: fields.link[0],
          url_img: '/upload/' + randomName + '-'+img.originalFilename
        }
        var work = new Work(data);
        work.save();
        res.send("Запись успешно добавлена!");
      })
    })

  });

});

module.exports = router;
