'use strict';

var app = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    'angular-loading-bar',
	'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {

    cfpLoadingBarProvider.parentSelector = '.loading-page';
    cfpLoadingBarProvider.spinnerTemplate = '<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';

    //cfpLoadingBarProvider.start();
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'Home'
        })
        .state('history', {
            url: '/history',
            templateUrl: 'views/history.html',
            controller: 'History'
        })
        .state('player', {
            url:'/play/:movieID',
            templateUrl: 'views/player.html',
            controller: 'Player'
        })
		
		$locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$http', '$location', '$state', '$stateParams', '$cookies', function($rootScope, $http, $location, $state, $stateParams, $cookies){
    $rootScope.$on('cfpLoadingBar:started', function(){$rootScope.loading = true;})
    $rootScope.$on('cfpLoadingBar:completed', function(){$rootScope.loading = false;})
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		//console.log(toState)
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        /*
		var favoriteCookie = JSON.stringify($cookies.get('video-session'));
		var object = favoriteCookie.substring(favoriteCookie.indexOf(':')+1, favoriteCookie.indexOf('.'));
		console.log(JSON.stringify(favoriteCookie));
		console.log(object);

        if(toState.name === 'player'){

        }*/

    });

}])
