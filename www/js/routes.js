angular.module('starter.routes',[])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })

      .state('app.registration',{
        url: '/registration',
        views:{
          'menuContent': {
            templateUrl: 'templates/registration.html',
            controller: 'regCtrl'
          }
        }
      })

      .state('app.registration_list',{
        url: '/registration_list',
        views:{
          'menuContent': {
            templateUrl: 'templates/registration_list.html',
            controller: 'reglistCtrl'
          }
        }
      })

      .state('app.remove_from_list',{
        url:'/{key}',
        views:{
          'menuContent': {
            controller: 'removeCtrl'
          }
        }
      })

      .state('app.server_url',{
        url: '/server_url',
        views:{
          'menuContent': {
            templateUrl: 'templates/server_url.html',
            controller: 'urlCtrl'
          }
        }
      })

      .state('app.self_view',{
        url: '/self_view',
        views:{
          'menuContent': {
            templateUrl: 'templates/self_view.html',
            controller: 'selfCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/registration');
  });
