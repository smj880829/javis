var express = require('express');
var router = express.Router();
var auth = require('../authorization')


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
  auth.access_check(req.headers.loginmethod,req.headers.token,function(re){
    if(re){
        res.render('test');
    }
    else {
      res.render('login_error');
    }
  })
});

router.get('/main' , function(req, res, next) {
  console.log(req.headers)
  res.render('main');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'welcome' });
});

router.post('/login', function(req, res, next) {
  if(req.body.email == '123' &&  req.body.password == '123'){
    res.redirect('/');
  }else {
    res.render('login',{title:'잘못된 계정입니다 ㅠ.'});
  }
});

router.get('/logout', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
