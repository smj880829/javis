var express = require('express');
var router = express.Router();

var app_access_token = '';

function get_app_access_token(){
  var https = require('https')
  var url = 'https://graph.facebook.com/oauth/access_token?client_id=706997686105976&client_secret=a0c72b5d0c9152bcd5a8fb0de44435b5&grant_type=client_credentials'
      https.get(url, (res) => {
        res.on('data', (chunk) => {
          var temp = chunk.toString()
          app_access_token = temp.split('=')[1]
          console.log(app_access_token);
        });
      }).on('error', (e) => {
        console.log(`auth error`);
      });
}
get_app_access_token();

var auth = function(req, res, next) {
  var https = require('https')
  var url2= 'https://graph.facebook.com/debug_token?input_token='+req.body.accessToken+'&access_token=' + app_access_token
  https.get(url2, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      var temp = JSON.parse(chunk)
      console.log(temp.data.is_valid);
    }).on('error', (e) => {
      console.log(`auth error`);
    });
  });


  /*
  if (req.body.accessToken)
    return next();
  else
    return   res.redirect('/login');*/
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',auth, function(req, res, next) {

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
