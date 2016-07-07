var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
  var data = {
    msg: "",
    display: "display: none"
  }
  if (req.session && req.session.login === "admin" && req.session.password)
    return next();
  else
    return res.send('not ok');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/login', auth, function(req, res) {
  if (auth) res.redirect('./admin');
});


module.exports = router;
