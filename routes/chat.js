var express = require('express');
var router = express.Router();
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
    res.render('main_chat/index');
});


module.exports = router;
