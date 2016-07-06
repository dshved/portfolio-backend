var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var Work = require('../models/work').Work;

var smtpConfig = {
  host: 'hostde5.fornex.org',
  port: 465,
  secure: true,
  auth: {
    user: 'noreplay@dshved.com',
    pass: 'noreplay1234noreplay'
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

/* GET home page. */
router.get('/', function(req, res, next) {
  Work.find().then(function(works){
    res.render('works', { data: works });
  });

  //res.render('works', { title: 'WORKS' });
});

router.post('/sendEmail', function(req, res, next) {
  console.log(req.body);
  var data = req.body;
  var mailOptions = {
    from: '"Noreplay" <noreplay@dshved.com>',
    to: 'dshved@hotmail.com, '+ '"'+ data.username + '"' + '<'+data.useremail +'>',
    subject: 'Новое сообщение с сайта',
    html: '<p>Вы писали:</p>' + data.text
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.end();
  //res.render('works', { title: 'WORKS' });
});

module.exports = router;
