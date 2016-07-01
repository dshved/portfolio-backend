var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/portfolio');

// var Post = mongoose.model('Post', {
//   title: String,
//   date: String,
//   text: String
// });

router.post('/', function(req, res, next) {
  var post = new Post(req.body);
  post.save();
  res.end();
});

module.exports = router;
