var app = angular.module('loginApp', [])

    app.controller('loginCtl',['$scope', '$window','$rootScope',  function($scope, $window,$rootScope) {

      $scope.check = function() {
          $window.alert($rootScope.user.name + $rootScope.user.id + $rootScope.user.email)
      }

    }]
    )


  app.run(['$rootScope', '$window',function($rootScope, $window) {
    $rootScope.user = {};

      function get_me() {
        FB.api('/me?fields=name,email', function(response) {
            $rootScope.user = response;
        });
      }

      function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          get_me();

        } else if (response.status === 'not_authorized') {
          $rootScope.user = {};

        } else {
          $rootScope.user = {};
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

      FB.login(function(response){
        alert("asd")
    });
  }]);
