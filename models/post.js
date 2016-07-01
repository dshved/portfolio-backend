var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  date: String,
  text: String
});

var Post = mongoose.model('Post', PostSchema);
module.exports = {
	Post: Post
}
