// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('aid', ['ionic', 'ngMessages', 'ngOrderObjectBy', 'jett.ionic.filter.bar', 'ionic-modal-select', 'intlpnIonic', 'aid.services', 'aid.controllers'])

.run(function($ionicPlatform, $state) {
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

        if (typeof localStorage.firstRun == "undefined") {
            // App has been instantiated for the first time
            $state.go('register');
        } else {
            // App has been already opened
            $state.go('donorslist');
        }

    });
    $ionicPlatform.onHardwareBackButton(function() {
        navigator.app.exitApp();
    });
})

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('donorslist', {
                url: '/donorslist',
                templateUrl: 'templates/donorsList/donorslist.html',
                controller: 'DonorListCtrl'
            })
        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: 'templates/donorsList/register.html',
                controller: 'InitialCtrl'
            })
        $stateProvider
            .state('registrationForm', {
                url: '/registrationForm',
                templateUrl: 'templates/donorsList/registrationForm.html',
                controller: 'AddDonorCtrl'
            })
            // $urlRouterProvider.otherwise('/donorslist');
    })
    .directive('noSpecialChar', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == undefined)
                        return ''
                    cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            }
        }
    });



/*Webservice URL*/

/*Development*/
localStorage.wsURL = "https://agile-caverns-88198.herokuapp.com/";
