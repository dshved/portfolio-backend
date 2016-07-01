var mongoose = require('mongoose');

var SkillSchema = new mongoose.Schema({
  html: {type: Number, min: 1, max: 100},
  css: {type: Number, min: 1, max: 100},
  js: {type: Number, min: 1, max: 100},
  git: {type: Number, min: 1, max: 100},
  gulp: {type: Number, min: 1, max: 100},
  bower: {type: Number, min: 1, max: 100},
  php: {type: Number, min: 1, max: 100},
  mysql: {type: Number, min: 1, max: 100},
  nodejs: {type: Number, min: 1, max: 100},
  mongodb: {type: Number, min: 1, max: 100}
});

var Skill = mongoose.model('Skill', SkillSchema);
module.exports = {
  Skill: Skill
}
