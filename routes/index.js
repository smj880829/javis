var express = require('express');
var router = express.Router();

var check_fb_user_accessToken = function(req, res, next) {
  var https = require('https')
  var url2= 'https://graph.facebook.com/debug_token?input_token='+req.body.accessToken+'&access_token=706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
  https.get(url2, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        var temp = JSON.parse(chunk)
          if (temp.data.is_valid){
            return next();
          }else{
            return   res.redirect('/login');
            }
    }).on('error', (e) => {
      console.log(`auth error`);
    });
  });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', check_fb_user_accessToken , function(req, res, next) {
  res.redirect('/');
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
