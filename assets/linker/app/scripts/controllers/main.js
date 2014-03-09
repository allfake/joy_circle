'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket) {
    var moveRange = 50;
    var windowFrame = { width: 500, height: 500}    

    $scope.position = {top: '250px', left:'600px'};
    $scope.gameWindow = { top: 0, left: '350px' };

    $socket.on('connectedUsers', function(data) {
      $scope.connectedUsers = data;
    });

    socket.get('/pad/read')

    $socket.on('serialport', function(data) {
      var pad = data.data.split(",");
      var padData;
      // to do to map for run function left right top left
    });

    $scope.$watch('position', function (newValue, oldValue) {
      var top = parseInt(newValue.top);
      var left = parseInt(newValue.left);
      var oldTop = parseInt(oldValue.top);
      var oldLeft = parseInt(oldValue.left);

      if (left < parseInt($scope.gameWindow.left) || left >= parseInt($scope.gameWindow.left) + windowFrame.width) {
        $scope.gameWindow.left = parseInt($scope.gameWindow.left) + left - oldLeft;
        $scope.gameWindow.left = $scope.gameWindow.left + 'px';
      }

      if (top < parseInt($scope.gameWindow.top) || top >= parseInt($scope.gameWindow.top) + windowFrame.height) {
        $scope.gameWindow.top = parseInt($scope.gameWindow.top) + top - oldTop;
        $scope.gameWindow.top = $scope.gameWindow.top + 'px';
      }
    }, true);

    $scope.left = function () {
      var position = parseInt($scope.position.left) - moveRange;
      $scope.position.left = position + "px";
    }
    $scope.right = function () {
      var position = parseInt($scope.position.left) + moveRange;
      $scope.position.left = position + "px";
    }
    $scope.up = function () {
      var position = parseInt($scope.position.top) - moveRange;
      $scope.position.top = position + "px";
    }
    $scope.down = function () {
      var position = parseInt($scope.position.top) + moveRange;
      $scope.position.top = position + "px";
    }
  });
