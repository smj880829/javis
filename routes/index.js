var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
  var http2 = require('https')
  var check = false
  var url = 'https://graph.facebook.com/debug_token?input_token='+req.body.accessToken+'&access_token=706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
  http2.get(url, (res) => {
    res.on('data', function (chunk) {
         console.log(chunk.is_valid);
         check = chunk.is_valid;
       });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });

  if (check)
    return next();
  else
    return   res.redirect('/test');
};

/* GET home page. */
router.get('/',auth, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',auth, function(req, res, next) {
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
