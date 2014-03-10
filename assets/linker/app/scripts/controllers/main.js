'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket) {
    var moveRange = 5;
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

      var direction = {
        UP: parseInt(pad[0].split(":")[1], 10),
        DOWN: parseInt(pad[1].split(":")[1], 10),
        LEFT: parseInt(pad[2].split(":")[1], 10),
        RIGHT: parseInt(pad[3].split(":")[1], 10),
        S: parseInt(pad[4].split(":")[1], 10),
        E: parseInt(pad[5].split(":")[1], 10),
        A: parseInt(pad[6].split(":")[1], 10),
        X: parseInt(pad[7].split(":")[1], 10),
        Y: parseInt(pad[8].split(":")[1], 10),
      } 

      if (direction.X < 0) {
        $scope.left();
      }

      if (direction.X > 0) {
        $scope.right();
      }

      if (direction.Y < 0) {
        $scope.down();
      }

      if (direction.Y > 0) {
        $scope.up();
      }

      var directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

      directions.forEach(function(d) {
        if (direction[d] === 0) {
          var method = d.toLowerCase();
          $scope[method]();
        }
      });


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
