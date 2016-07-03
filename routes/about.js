var express = require('express');
var router = express.Router();

var Skill = require('../models/skills').Skill;

router.get('/', function(req, res, next) {
  Skill.find().then(function(skills){

  	if (skills.length < 1) {

			var data = {
				html: 0, css: 0, js: 0, 
				git: 0, gulp: 0, bower: 0, 
				php: 0, mysql: 0, nodejs: 0, mongodb:0	
			};

			res.render('about', {data: data});

		} else {

			res.render('about', { data: skills[0] });	

		};

  });
  
});

module.exports = router;
