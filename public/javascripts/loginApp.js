var app = angular.module('loginApp', [])

  app.run(['$rootScope', '$window',function($rootScope, $window) {
      $rootScope.user = {};
      var _self = this;

      getUserInfo = function() {
        var _self = this;

        FB.api('/me', function(res) {
          $rootScope.$apply(function() {
            $rootScope.user = _self.user = res;
          });
        });
      }

      function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          _self.getUserInfo();
        } else if (response.status === 'not_authorized') {

        } else {

        }
      }

      $window.fbAsyncInit = function() {
        FB.init({
          appId: '706997686105976',
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v2.2'
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
