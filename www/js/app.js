// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('aid', ['ionic','aid.services','aid.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('donorslist', {
        url: '/donorslist',
        templateUrl: 'templates/donorsList/donorslist.html',
        controller:'DonorListCtrl'
    })
        $stateProvider
        .state('adddonor', {
        url: '/adddonor',
        templateUrl: 'templates/donorsList/adddonor.html',
        controller:'DonorListCtrl'
    })
         $stateProvider
        .state('register', {
        url: '/register',
        templateUrl: 'templates/donorsList/register.html',
        controller:'DonorListCtrl'
    })
        $stateProvider
        .state('registrationForm', {
        url: '/registrationForm',
        templateUrl: 'templates/donorsList/registrationForm.html',
        controller:'DonorListCtrl'
    })
        $urlRouterProvider.otherwise('/register');
})



/*Webservice URL*/

/*Development*/
localStorage.wsURL="http://192.168.1.14:3000/";

