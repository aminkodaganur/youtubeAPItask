youtubeApp.directive('searchField',  function(){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'dist/app/views/searchField.html'
	};
});

