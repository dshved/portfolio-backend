var mongoose = require('mongoose');

var WorkSchema = new mongoose.Schema({
  title: String,
  stack: String,
  url_work: String,
  url_img: String
});

var Work = mongoose.model('Work', WorkSchema);
module.exports = {
  Work: Work
}
