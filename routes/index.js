var express = require('express');
var router = express.Router();

function check_fb_user_accessToken(token, callback) {
  var https = require('https')
  var url2= 'https://graph.facebook.com/debug_token?input_token='+token+'&access_token=706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
  https.get(url2, (re) => {
    re.setEncoding('utf8');
    re.on('data', (chunk) => {
        var temp = JSON.parse(chunk)
        callback(temp.data.is_valid)
    }).on('error', (e) => {
      console.log(`auth error`);
    });
  });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers["token"])
  if (check_fb_user_accessToken(req.headers["token"])){
    res.render('index');
  }else{
     res.redirect('/login');
    }
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
