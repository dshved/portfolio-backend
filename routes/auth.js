var express = require('express');
var router = express.Router();


var auth = function(req, res, next) {
  if (req.session && req.session.login === "admin" && req.session.password)
    return next();
  else
    return res.render('auth');
};

router.get('/', auth, function(req, res) {
  if (auth) res.redirect('./admin');
});


router.post('/', function(req, res) {

  if (!req.body.login || !req.body.password) {
    res.render('auth', { title: 'FAILED' });
  } else if (req.body.login === "admin" && req.body.password === "admin") {
    req.session.login = "admin";
    req.session.password = true;
    res.redirect('./admin')
  } else {
    res.render('auth', { title: 'FAILED' });
  }
});

module.exports = router;
