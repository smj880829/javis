var app = angular.module('loginApp', [])

app.controller('loginCtl',['$scope', '$window','$rootScope','$document','$http',  function($scope, $window,$rootScope,$document,$http) {

  $scope.login = function() {

    FB.api('/me?fields=id,name,email', function(response) {
        $window.alert(response)
    });
    /*
    FB.login(function(response){
      var accessToken = response.authResponse.accessToken;
      if (response.authResponse) {
             $http.defaults.headers.common.Authorization = accessToken;
             $http.defaults.headers.common.loginMethod = 'facebook';

             document.getElementById('loginform').submit()
      } else {

      }
    });*/
  }

}]
)

  app.run(['$rootScope', '$window',function($rootScope, $window) {
      function statusChangeCallback(response) {

        console.log(response)
        if (response.status === 'connected') {
          //$window.location.href = "/";
        } else if (response.status === 'not_authorized') {
          FB.login()
        } else {
          FB.login()
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

  app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://54.199.240.31/');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  })
