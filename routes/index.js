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

  var auth = new authorization()
  auth.checkLocalToken(req.headers.token,function(re){
    if(re){
      res.render('test');
    }else{
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
    var auth = new authorization()
    auth.method(req.body.loginmethod).email(req.body.email).pass(req.body.password).token(req.body.accesstoken).id(req.body.id).name(req.body.name)
    var token = '';
    auth.check_user(function(re){
          if(re != null){
          token = re
          res.send({'token' : token,'check':'ok'});
        }else{
            res.send({'check':'on'});
        }
    });
});

router.get('/logout', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
