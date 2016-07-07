var express = require('express');
var session = require('express-session');
var router = express.Router();
var multiparty = require('multiparty');
var async = require('async');
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
  var data = {};

  if (auth) {

    async.parallel([
      function(cb) {
        Post.find({}, function(err, posts) {
          data['posts'] = posts;
          cb();
        });
      },
      function(cb) {
        Work.find({}, function(err, works) {
          data['works'] = works;
          cb();
        });
      },
      function(cb) {
        Skill.find({}, function(err, skills) {
          if (skills.length < 1) {
            var value = {
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
            data['data'] = value;
          } else {
            data['data'] = skills[0];
          }
          cb();
        });
      }
    ], function(err) {
      if (err) return next(err);

      res.render('admin', data);
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

      var path = './public/upload/' + randomName + '-' + img.originalFilename;

      fs.writeFile(path, data, function(err) {
        if (err) console.log(err);
        var data = {
          title: fields.name[0],
          stack: fields.skill[0],
          url_work: fields.link[0],
          url_img: '/upload/' + randomName + '-' + img.originalFilename
        }
        var work = new Work(data);
        work.save();
        res.send("Запись успешно добавлена!");
      })
    })
  });
});

router.post('/removePost', function(req, res, next) {
  var id = req.body['id'];
  Post.findByIdAndRemove(id, function(err) {
    if (err) throw err;
    res.send('Запись успешно удалена');
  });
});

router.post('/removeWork', function(req, res, next) {
  var id = req.body['id'];
  Work.findByIdAndRemove(id, function(err) {
    if (err) throw err;
    res.send('Работа успешно удалена');
  });
});

module.exports = router;
