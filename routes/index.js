var express = require('express');
var router = express.Router();
var auth = require('../authorization')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('try get')
  console.log(req.headers.authorization)
  auth.check_accessToken(req.headers.authorization,function(re){
    console.log(re)
    if(re){

      res.render('index');
    }
    else {
      res.redirect('/login');
    }
  })
});

router.post('/' , function(req, res, next) {
  res.render('index');
});

router.get('/test', function(req, res, next) {
  res.render('test');
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
