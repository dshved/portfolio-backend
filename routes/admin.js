var express = require('express');
var session = require('express-session');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');


var Skill = require('../models/skills').Skill;
var Post = require('../models/post').Post;

var auth = function(req, res, next) {
  if (req.session && req.session.login === "admin" && req.session.password)
    return next();
  else
    return res.redirect('./auth');
};

router.get('/', auth, function (req, res) {
  if (auth) {
    console.log('login')
    Skill.find().then(function(skills){
    if (skills.length < 1) {
      var data = {
        html: 0, css: 0, js: 0, 
        git: 0, gulp: 0, bower: 0, 
        php: 0, mysql: 0, nodejs: 0, mongodb:0  
      };
      res.render('admin', {data: data});
      console.log('logn not data')
    } else {
      res.render('admin', { data: skills[0] }); 
      console.log('data')
    }
    
  });
  } else {
    res.redirect('./auth');
  }
});



router.post('/saveSkill', function(req, res, next) {
  console.log('****************save******************')
	Skill.find().then(function(skill){
    console.log(req.body);
		if (skill.length >=1) {
			Skill.update({ _id: skill[0]._id }, req.body, function(){
				console.log('Update id:',skill[0]._id)
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

		fs.readFile(img.path, function(err, data){
			var path = './public/upload/' + img.originalFilename;

			fs.writeFile(path, data, function(err){
				if(err) console.log(error);
				res.send("Картинка загружена");
			})
		})
  });

});

module.exports = router;
