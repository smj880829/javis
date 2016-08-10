var app = angular.module('mainChat',  ['ngRoute','ngAnimate','ngScrollable','ngCookies'])

app.run(['$rootScope', '$window','$http'
function($rootScope, $window,$http) {
  $http.defaults.headers.common.token = localStorage.localtoken;

  $rootScope.roomlist = [];

}]);


app.controller('roomCtl',['$scope','$window', '$http', 'socket','$log', '$anchorScroll', '$location','$rootScope',
 function($scope, $window,$http,socket,$log,$anchorScroll,$location,$rootScope) {


   socket.on('initRoomList', function (data) {
     //룸 리스트 init
     $rootScope.roomlist = data.list
   });

}]
)

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
  app.directive('myEnter', function () {
      return function (scope, element, attrs) {
          element.bind("keydown", function (event) {
              if(event.which === 13) {
                  scope.$apply(function (){
                      scope.$eval(attrs.myEnter);
                  });

                  event.preventDefault();
              }
          });
      };
  })
