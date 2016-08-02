var app_access_token = '706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'


/*
function get_app_access_token(){
  var https = require('https')
  var url = 'https://graph.facebook.com/oauth/access_token?client_id=[]&client_secret=[]&grant_type=client_credentials'
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
*/

var check_fb_user_accessToken = function(req, res, next) {
  var https = require('https')
  var url2= 'https://graph.facebook.com/debug_token?input_token='+req.body.accessToken+'&access_token=706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
  https.get(url2, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        var temp = JSON.parse(chunk)
        if (temp.data.is_valid)
          return next();
        else
          return   res.redirect('/login');
    }).on('error', (e) => {
      console.log(`auth error`);
    });
  });
};


exports.check_fb_user_accessToken = check_fb_user_accessToken;
