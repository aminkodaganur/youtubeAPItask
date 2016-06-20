var youtubeApp = angular.module('youtubeApp', ['ui.router','jtt_youtube','youtube-embed']);

youtubeApp.config(['$urlRouterProvider','$stateProvider','$httpProvider',function($urlRouterProvider,$stateProvider,$httpProvider) {
	

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home',{
			url : '/home',
			templateUrl : 'dist/app/views/home.html',
			controller : 'appHomeController' 
		})
		.state('results',{
			url : '/results/:query',
			templateUrl : 'dist/app/views/results.html',
			controller : 'youtubeResultsCntlr'
		})

}]);




