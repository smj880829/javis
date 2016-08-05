var app = angular.module('loginApp', [])

app.controller('loginCtl',['$scope', '$window','$rootScope','$document','$http',  function($scope, $window,$rootScope,$document,$http) {
  $scope.loginMethod ='';
  $scope.accessToken ='';
  $scope.id = ''
  $scope.name = ''
  $scope.login = function() {
    $scope.loginMethod = 'nomal';
  }

  $scope.FBlogin = function() {
      $scope.accessToken = $rootScope.accesstoken
      $scope.loginMethod = 'facebook';

        FB.api('/me?fields=email,name,id', function(res) {
            $scope.email = res.email;
            $scope.id = res.id;
            $scope.name = res.name;

            $scope.loginhttp();
        });

         //$http.defaults.headers.common.Authorization = accessToken;
         //$http.defaults.headers.common.loginMethod = 'facebook';

  }

  $scope.loginhttp = function() {
    $http({
    method: 'POST' ,
    url: '/login',
    data: $.param({
        loginmethod: $scope.loginMethod,
        accesstoken: $scope.accessToken,
        email: $scope.email,
        password : $scope.password,
        id : $scope.id,
        name : $scope.name
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    }).success(function(response) {
      if(response.check == 'ok'){
        localStorage.setItem("localtoken", response.token);
        $window.location.href = '/';
      }else{
        angular.element('#title').html("다시 시도해주세요");
      }
    }).finally(function() {
        console.log('Complete');
        $window.location.href = '/login';
    });

  }

}]
)

  app.run(['$rootScope', '$window',function($rootScope, $window) {
    $rootScope.accesstoken = "";
      function statusChangeCallback(response) {

        console.log(response)
        if (response.status === 'connected') {
          $rootScope.accesstoken = response.authResponse.accessToken;
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
