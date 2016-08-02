var app = angular.module('loginApp', [])

app.controller('loginCtl',['$scope', '$window','$rootScope','socket','$http',  function($scope, $window,$rootScope,socket,$http) {

  $scope.login = function() {
    FB.login(function(response){
      var accessToken = response.authResponse.accessToken;
      if (response.authResponse) {
             $http.defaults.headers.common.Authorization = accessToken;
             FB.api('/me?fields=name,email', function(response) {
               //socket.emit('login',{'name':response.name,'id':response.id,'email':response.email,'accessToken': accessToken})
               //$window.location.href = "/";
                      $http({
                          	method: 'GET', //방식
                          	url: '/' /* 통신할 URL */
                      })
                      .success(function(data, status, headers, config) {
                      	if( data ) {
                          
                      	}
                      	else {
                      		/* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
                      	}
                      })
                      .error(function(data, status, headers, config) {
                      	/* 서버와의 연결이 정상적이지 않을 때 처리 */
                      	console.log(status);
                      });
             });
      } else {

      }
    });
  }

}]
)

  app.run(['$rootScope', '$window',function($rootScope, $window) {
      function statusChangeCallback(response) {
        if (response.status === 'connected') {
          //$window.location.href = "/";
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
