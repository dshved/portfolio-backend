var express = require('express');
var router = express.Router();

var Skill = require('../models/skills').Skill;

router.post('/', function(req, res, next) {

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

module.exports = router;
