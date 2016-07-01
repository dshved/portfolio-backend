var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio');

var Post = mongoose.model('Post', {
  title: String,
  date: String,
  text: String
});

router.get('/', function(req, res, next) {
  Post.find().then(function(posts){
    res.render('posts', { data: posts });
  });
  
});

module.exports = router;
