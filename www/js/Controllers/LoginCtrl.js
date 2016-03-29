'use strict';

/**
 * Controller to handle authentication and logging in 
 */
angular.module('starter')

.controller('LoginCtrl', function($scope, $ionicModal, $location) {
  $ionicModal.fromTemplateUrl('templates/login/signin-modal.html', {
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

  $ionicModal.fromTemplateUrl('templates/login/signup-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSignup = modal;
  });
  $scope.openModalSignup = function() {
    $scope.modalSignup.show();
  };
  $scope.closeModalSignup = function() {
    $scope.modalSignup.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalSignup.remove();
  });
  // Execute action on hide modal
  $scope.$on('modalSignup.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modalSignup.removed', function() {
    // Execute action
  });

  // For now it doesn't authenticate
  // it just takes us to the main page
	$scope.submit = function() {
    $location.path("/app/home");
    $scope.closeModal();
    $scope.closeModalSignup();
  }  
})