// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
/* Make lodash an injectable service */
angular.module('lodash', [])
  .factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.dash', {
        url: '/dash',
        views: {
          '': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.scan', {
        url: '/scan',
        views: {
          '': {
            templateUrl: 'templates/tab-scan.html',
            controller: 'ScanCtrl'
          }
        }
      })
      .state('tab.scanning', {
        url: '/scanning',
        views: {
          '': {
            templateUrl: 'templates/tab-scanning.html',
            controller: 'ScanningCtrl'
          }
        }
      })
      .state('tab.result', {
        url: '/result',
        views: {
          '': {
            templateUrl: 'templates/tab-result.html',
            controller: 'ResultCtrl'
          }
        }
      })
      .state('tab.result-detail', {
        url: '/result/detail',
        views: {
          '': {
            templateUrl: 'templates/result-detail.html',
            controller: 'ResultDetailCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/scan');

  });
