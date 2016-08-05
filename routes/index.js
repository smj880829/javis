var express = require('express');
var router = express.Router();
var authorization = require('../authorization')



/* GET home page. */
router.get('/', function(req, res, next) {
  //req.headers.authorization
    res.render('index');
});

router.post('/' , function(req, res, next) {
  res.render('index');
});


router.get('/profile' , function(req, res, next) {
  res.render('profile');
});

router.get('/test', function(req, res, next) {
  console.log(req.headers)
        res.render('test');
});

router.get('/main' , function(req, res, next) {
  console.log(req.headers)
  res.render('main');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'welcome' });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    var auth = new authorization(req.body.loginmethod)
    console.log("1");
    auth.email(req.body.email).pass(req.body.password).token(req.body.accesstoken).id(req.body.id).name(req.body.name)
    console.log("2");
    var token = '';
    auth.check_user(function(re){
      re = token
    });
    console.log(token);

    res.send({'token' : token});
});

router.get('/logout', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
