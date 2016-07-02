var express = require('express');
var router = express.Router();

var Skill = require('../models/skills').Skill;

router.get('/', function(req, res, next) {
	Skill.find().then(function(skills){
    res.render('admin', { data: skills[0] });
  });
});

module.exports = router;
