'use strict';

/**
 * Controller to simulate plug pin insertion
 */
angular.module('starter')

.controller('PlugPinCtrl', function($scope, $ionicModal, $location, $rootScope, Chats, $ionicPopup) {

  $ionicModal.fromTemplateUrl('templates/popups/plug-match.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


  // Simulate the user pluggin with other users
  $scope.plug = function() {
    $scope.user = $rootScope.user;
    $scope.plugger = Chats.random();

    // for the templateUrl, dont' focus on the ion-view tags
    // just inser the content inside of their.
    var myPopup = $ionicPopup.show({
      templateUrl: '/templates/popups/plug-match.html',
      title: "You and " + $scope.plugger.name + " have plugged.",
      scope: $scope,
      buttons: [
        {
          text: 'Ok',
          type: 'button-dark',
          onTap: function(e) {

          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });    
  }

});