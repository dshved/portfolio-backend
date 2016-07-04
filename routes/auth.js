var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('auth', { title: 'AUTH' });
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
