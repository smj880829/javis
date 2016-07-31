var app = angular.module('loginApp', [])

  app.run(['$rootScope', '$window',function($rootScope, $window) {
    $rootScope.user = {};

      var get_me = function(callback) {
        FB.api('/me?fields=name,email', function(response) {
          $rootScope.user  = response;
            return callback();
        });
      }

      function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          get_me();

          console.log($rootScope.user.name)
          console.log($rootScope.user.id)
          console.log($rootScope.user.email)
        } else if (response.status === 'not_authorized') {
          $rootScope.user = {};
          console.log($rootScope.user.name)
          console.log($rootScope.user.id)
          console.log($rootScope.user.email)
        } else {
          $rootScope.user = {};
          console.log($rootScope.user.name)
          console.log($rootScope.user.id)
          console.log($rootScope.user.email)
        }
      }

      $window.fbAsyncInit = function() {
        FB.init({
          appId: '706997686105976',
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v2.7'
        });
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

  }]);
