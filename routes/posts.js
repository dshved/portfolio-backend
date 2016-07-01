var express = require('express');
var router = express.Router();


var Post = require('../models/post').Post;

router.get('/', function(req, res, next) {
  Post.find().then(function(posts){
    res.render('posts', { data: posts });
  });
  
});

module.exports = router;
