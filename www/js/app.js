// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope, Chats) {
  // main user profile
  $rootScope.user = Chats.get(0);
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Setup the login page with signin/signup modals
  .state('login',{
    url: '/login',
    templateUrl: 'templates/login/login.html',
    controller: 'LoginCtrl'
  })  

  // Setup the side-menu menu super-view
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/main/side-menu-super-view.html',
    controller: 'DashCtrl'
  })
  // -- Subviews of main side-menu
  // Home
  .state('app.home', {
    url: '/home',
    views: {
      'menu-view': {
        templateUrl: 'templates/main/plug-menu.html',
        controller: 'DashCtrl'
      }
    }
  })
  // Plug pin
  .state('app.plug-pin', {
    url: '/plug-pin',
    views: {
      'menu-view': {
        templateUrl: 'templates/main/plug-pin.html',
        controller: 'PlugPinCtrl'
      }
    }
  })
  // Plug connect
  .state('app.plug-connect', {
    url: '/plug-connect',
    views: {
      'menu-view': {
        templateUrl: 'templates/main/plug-connect.html',
        controller: 'PlugConnectCtrl'
      }
    }
  })
  // Plug notifications
  .state('app.plug-notifications', {
    url: '/plug-notifications',
    views: {
      'menu-view': {
        templateUrl: 'templates/main/plug-notifications.html',
        controller: 'PlugConnectCtrl'
      }
    }
  })

  // -- Settings page
  .state('app.settings', {
    url: '/settings',
    views: {
      'menu-view': {
        templateUrl: 'templates/settings/settings.html'
      }
    }
  })
  // -- Settings -> Filter page
  .state('app.filter', {
    url: '/settings/filter',
    views: {
      'menu-view': {
        templateUrl: 'templates/settings/filter.html',
        controller: 'AccountCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
