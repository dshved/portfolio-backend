var express = require('express');
var router = express.Router();

var Skill = require('../models/skills').Skill;
var Post = require('../models/post').Post;

router.get('/', function(req, res, next) {
	Skill.find().then(function(skills){
		if (skills.length < 1) {
			var data = {
				html: 0, css: 0, js: 0, 
				git: 0, gulp: 0, bower: 0, 
				php: 0, mysql: 0, nodejs: 0, mongodb:0	
			};
			res.render('admin', {data: data});
		} else {
			res.render('admin', { data: skills[0] });	
		}
    
  });
});

router.post('/saveSkill', function(req, res, next) {

	Skill.find().then(function(skill){

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


module.exports = router;
