var app = angular.module('loginApp', [])

app.controller('loginCtl',['$scope', '$window','$rootScope',  function($scope, $window,$rootScope) {

  $scope.login = function() {
    FB.login(function(response){
      $window.alert(response.name,response.id,response.email)
      //socket.emit('login',{'message' : $scope.message,'user':'admin'});
      $window.location.href = "/";
    });
  }

}]
)

  app.run(['$rootScope', '$window',function($rootScope, $window) {
      function statusChangeCallback(response) {
        if (response.status === 'connected') {
          $window.location.href = "/";
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
