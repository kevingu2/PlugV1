angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, Chats, Camera, 
  $location, $ionicPopup, SocialNetworks, $rootScope, $ionicModal, $cordovaBarcodeScanner) {

  $scope.networks = SocialNetworks.all();
  $scope.user = $rootScope.user;

  $scope.scanBarcode = function() {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
          alert(imageData.text);
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
          console.log("An error happened -> " + error);
      });
  };


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


  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      // do a popup alert
      console.log(imageURI);
      $scope.openModal();
    }, function(err) {
      console.err(err);
    });
  };

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


  // give us a list of the social networks to request from
  $ionicModal.fromTemplateUrl('templates/popups/plug-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.request = modal;
  });
  $scope.openRequest = function(id) {
    $scope.plugUser = Chats.get(id);

    $scope.request.show();
  };
  $scope.closeRequest = function() {
    $scope.request.hide();
     var alertPopup = $ionicPopup.alert({
      title: 'Request sent!'
    });

  
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.request.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  // Setup the popup to be able show the social networks to request
  // from that users
  $scope.profileLoad = function(id) {
    $scope.data = {};
    $scope.openRequest(id);
  }

    $scope.profiles = Chats.all();

    $scope.user = $rootScope.user;
  
    $scope.doSomething = function() {
      console.log("hai world");
    }

  $scope.signout = function() {
    $location.path("/login");
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, SocialNetworks) {

  $scope.networks = SocialNetworks.all();

  console.log($scope.networks);
});
