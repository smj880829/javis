var app = angular.module('mainChat',  ['ngRoute','ngAnimate','ngScrollable','ngCookies'])

app.run(['$rootScope', '$window','$http',
function($rootScope, $window,$http) {
  $http.defaults.headers.common.token = localStorage.localtoken;

  $rootScope.roomlist = [];
  $rootScope.selectroom;
  $rootScope.chatLogs = [];

}]);


app.controller('roomCtl',['$scope','$window', '$http', 'socket','$log', '$anchorScroll', '$location','$rootScope',
 function($scope, $window,$http,socket,$log,$anchorScroll,$location,$rootScope) {

   socket.emit('initRoomList');
   socket.on('initRoomList', function (data) {
     //룸 리스트 init
     $rootScope.roomlist = data.list
   });

   socket.on('initChatLogs', function (data) {
     //체팅 초기화
     $rootScope.chatLogs = data;
   });

   $scope.createRoom = function(name) {
     socket.emit('createRoom',name);
   }

   $scope.joinRoom = function(room) {
     $window.alert(room)
     $rootScope.selectroom = room;
     socket.emit('joinRoom',room);
   }

}]
)

app.controller('chatCtl',['$scope','$window', '$http', 'socket','$log', '$anchorScroll', '$location','$rootScope',
 function($scope, $window,$http,socket,$log,$anchorScroll,$location,$rootScope) {

   //socket.emit('initChatLogs');
   socket.on('initChatLogs', function (data) {
     //룸 리스트 init
     $rootScope.chatLogs = data;
   });

   $scope.insertChatLog = function() {
     var temp = {'message' : $scope.message,'user':localStorage.getItem('email'),'room':$rootScope.selectroom}
     socket.emit('insertChatLog',temp);
     $rootScope.chatLogs.push(temp)
   }

   socket.on('insertChatLog', function (data) {
     $rootScope.chatLogs = data;
   });

   socket.on('newChatLog', function (data) {
     $rootScope.chatLogs.push(data)
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
