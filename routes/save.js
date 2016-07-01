var express = require('express');
var router = express.Router();

var Post = require('../models/post').Post;

router.post('/', function(req, res, next) {
  var post = new Post(req.body);
  post.save();
  res.end();
});

module.exports = router;
