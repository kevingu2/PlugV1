angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, Chats, Camera, $http,
  $location, $ionicPopup, SocialNetworks, $rootScope, $ionicModal, $cordovaBarcodeScanner, $timeout) {

  $scope.networks = SocialNetworks.all();
  $scope.user = $rootScope.user;
  $scope.users = Chats.all();


  $scope.scanBarcode = function() {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
          alert(imageData.text);
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
          console.log("An error happened -> " + error);
      });
  };


  $scope.connect = function() {
    var date = new Date();
    var coord = {
      date: new Date(),
      longitude: 32.881798, 
      latitude: -117.241123
    };

    $http({
          url: 'http://plug-mobile.herokuapp.com/api/requests',
          method: "POST",
          data: coord,
          headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + $rootScope.token.data.value}
      }).success(function (data, status, headers, config) {
            $rootScope.message = data;

          }).error(function (data, status, headers, config) {
              $scope.status = status;
          });


    timer();
  }
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

        $http({
          url: 'http://plug-mobile.herokuapp.com/api/requests?request_id=' + $rootScope.message.message._id,
          method: "GET",
          headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + $rootScope.token.data.value}
        }).success(function (data, status, headers, config) {
          console.log(data);

        }).error(function (data, status, headers, config) {

        });

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

     // Make the instagram request
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
