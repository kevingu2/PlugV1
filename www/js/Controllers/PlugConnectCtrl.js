'use strict';

/**
 * Controller to handle recieving plug connects 
 */
angular.module('starter')

.controller('PlugConnectCtrl', function($scope, $ionicModal, $location, $timeout, $ionicPopup, Chats, $ionicHistory) {
  // Simulate notification
  $scope.init = function() {
    console.log("Speak your mind");
    timer()
  };

  // Dummy users 
  $scope.users = Chats.all();

  // Simulate notification
  var cancelTime;
  $scope.time = 5000;
  var timer = function() {
    // initiate the timer

    // call this function after every 1000ms
    cancelTime = $timeout(function() {
      $scope.time = $scope.time -= 1000;
      if ($scope.time <= 0) {
        // simulate the nofication throug a popup or link
        $location.path('/app/plug-notifications');
        console.log("FINISH THIS SHIT")
        return;
      }
      timer();
    }, 1000);
  };

  $scope.$on('$ionicView.leave', function(){
    console.log("Left this page");
    $timeout.cancel(cancelTime);
  });

  // Go back to the previous view
  $scope.back = function() {
    $ionicHistory.goBack();
  }

});