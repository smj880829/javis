var jwt = require('jwt-simple');
var db = require('./MongoConnector/DAO')

var app_access_token = '706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'

var authorization = function(meth) {        //생성자 선언
    this.method =  meth;
  this.email = ''
  this.pass = ''
  this.externaltoken = ''
  this.localtoken = ''
  this.id = ''
  this.name = ''
  this.secret = 'wow';
  console.log("new ok");

  this.email = function(input){
    console.log("1.5");
  	this.email = input;
    return this;
  };

  this.pass = function(input){
  	this.pass = input;
    return this;
  };

  this.token = function(input){
  	this.externaltoken = input;
    return this;
  };

  this.id = function(input){
  	this.id = input;
    return this;
  };

  this.name = function(input){
  	this.name = input;
    return this;
  };

}

authorization.prototype.check_user = function(callback){
  console.log(this.method + this.email)
  var check = false;
  switch (this.method) {
    case 'nomal'    :
                 break;
    case 'facebook'   : check_accessToken_fb(this.externaltoken,function(re){ check = re })
                 break;
    default    :
                 break;
  }

  if(check){
    getLocalToken(function(re){
      callback(re);
    })
  }
  else {
      callback(null);
  }
}

function check_localuser(callback){

}

function getLocalToken(callback){
  var date = new Date();
  var min = date.getMinutes();
  date.setMinutes(min + 1);
  var payload = { 'email' : this.email, 'expiration':date };

  var token = jwt.encode(payload, secret);
  callback(token)
}

function checkLocalToken(inputToken,callback){
  var date = new Date();

  var decoded = jwt.decode(inputToken, secret);
    //console.log(decoded); //=> { foo: 'bar' }
    if(date > decoded.expiration)
      callback(true)
    else
      callback(false)

}

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

function check_accessToken_fb(token, callback) {
  var https = require('https')
  var url2= 'https://graph.facebook.com/debug_token?input_token='+token+'&access_token=706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
  https.get(url2, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        var temp = JSON.parse(chunk)
        callback(temp.data.is_valid)
    }).on('error', (e) => {
      console.log(`auth error`);
      callback(false)
    });
  });
};

module.exports = authorization;
exports.check_user = check_user;
