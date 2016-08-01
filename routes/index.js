var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
  var https = require('https')
  var ob = '';
  var str = '';
  var url = 'https://graph.facebook.com/debug_token?input_token='+req.body.accessToken
      https.get(url, (res) => {
        res.on("data", function(chunk) {
          str +=  chunk
        });

        res.on('end', function() {
            console.log(str);
            var temp = str.split('|');
            ob = temp[1];
          });
      }).on('error', (e) => {
        console.log(`auth error`);
      });

  if (req.body.accessToken)
    return next();
  else
    return   res.redirect('/login');
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
