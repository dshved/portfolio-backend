var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio');

var Post = mongoose.model('Post', {
  title: String,
  date: String,
  text: String
});