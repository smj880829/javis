var express = require('express');
var router = express.Router();
var authorization = require('../authorization')
var token_ctl = require('../controller_token')


function authChecker(req, res, next) {
  if(req.cookies.token != null){
        token_ctl.checkToken(req.cookies.token,function(re){
          if(re){
            next();
          }else{
            res.redirect('/login')
          }
        })
  }else {
        res.redirect('/login')
  }

}


/* GET home page. */
router.get('/',authChecker, function(req, res, next) {
  //req.headers.authorization
    res.render('index');
});


router.get('/profile' , function(req, res, next) {
  res.render('profile');
});

router.get('/test', function(req, res, next) {
  token_ctl.checkToken(req.headers.token,function(re){
    if(re){
      res.render('test');
    }else{
      res.render('login_error');
      }
  })
});

router.get('/main' , function(req, res, next) {
  res.render('main');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'welcome' });
});

router.post('/login', function(req, res, next) {

  var auth = new authorization()
    auth.method(req.body.loginmethod)
    .email(req.body.email)
    .pass(req.body.password)
    .token(req.body.accesstoken)
    .id(req.body.id)
    .name(req.body.name)

    auth.check_user(function(re){
          if(re){
           token_ctl.getNewToken(function(token){
             res.cookie('token',token,{expires: new Date(Date.now() + 60000),httpOnly: true,maxAge:60000})
             res.send({'token' : token,'check':'true'});
          })
        }else{
            res.send({'check':'false'});
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
