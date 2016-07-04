var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/setsession',function(req,res){
       req.session.username="safeer"; 
       res.send("hi "+ req.session.username);
});

module.exports = router;
