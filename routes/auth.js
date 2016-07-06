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
    return res.render('auth', {data: data});
};

router.get('/', auth, function(req, res) {
  if (auth) res.redirect('./admin');
});


router.post('/', function(req, res) {
  var data = {
    msg: "Не правильное имя или пароль!",
    display: "block"
  }

  if (!req.body.login || !req.body.password) {
    res.render('auth', {data: data});
  } else if (req.body.login === "admin" && req.body.password === "admin") {
    req.session.login = "admin";
    req.session.password = true;
    res.redirect('./admin')
  } else {
    res.render('auth', {data: data});
  }
});

module.exports = router;
