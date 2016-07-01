var express = require('express');
var router = express.Router();

var Skill = require('../models/skills').Skill;

router.post('/', function(req, res, next) {
  var post = new Skill(req.body);
  post.save();
  res.end();
});

module.exports = router;
