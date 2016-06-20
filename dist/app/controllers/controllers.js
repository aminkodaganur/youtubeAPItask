youtubeApp.controller('appHomeController', ['$scope','$state','autoComplete', function($scope,$state,autoComplete){
	
	$scope.findVideos = function(){
		if($.trim($scope.searchQuery) == ""){
			// do nothing
		}else{
			$state.go('results',{query : $scope.searchQuery });
		}
	};
	$scope.autoFillResult = '';
	$scope.findAutofill = function(){

		if($.trim($scope.searchQuery) == ""){
			$scope.autoFillResult =[];
		}else{
			$scope.autoFillResult =[];
			autoComplete.list($scope.searchQuery,function(row) {
	        	row[1].forEach(function(result,index){
	        		$scope.autoFillResult.push(result[0]);
	        	});
	        });

		}	

	};
	$scope.applyKey = function(key){
		$scope.searchQuery = key;
		$state.go('results',{query : $scope.searchQuery });
	};

}]);

youtubeApp.controller('youtubeResultsCntlr',['$scope','$stateParams','youtubeFactory', function($scope,$stateParams,youtubeFactory){

	$scope.q = $stateParams.query;
	var apiKey = "AIzaSyAWBYy__s8QXHlVU2tnm4XTXtmCkphRbJQ";
    $scope.videosList = [];
	
	youtubeFactory.getVideosFromSearchByParams({
        q: $scope.q,
        maxResults: "9",
        key: apiKey,
    }).then(function (data) {
        var i = 1;
        console.log(data);
        data.data.items.forEach(function(result,index){  

			var pdate = new Date(new Date(Date.parse(result.snippet.publishedAt)));
        	var row ={
        			'id' : i , 
        			'videoID' : result.id.videoId ,
        			'title' : result.snippet.title, 
        			'description' : result.snippet.description,
        			'publishedDate' : pdate.toString(),
        			'timeDiff' : time_ago(pdate),
        			'thumbnail' : result.snippet.thumbnails.medium.url
        		};
        	$scope.videosList.push(row);
        	i++;
        });
    });

      $scope.propertyName = 'publishedDate';
	  $scope.reverse = true;

	  $scope.sortBy = function(propertyName) {
	    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	    $scope.propertyName = propertyName;
	  };

    function time_ago(time){

		switch (typeof time) {
		    case 'number': break;
		    case 'string': time = +new Date(time); break;
		    case 'object': if (time.constructor === Date) time = time.getTime(); break;
		    default: time = +new Date();
		}
		var time_formats = [
		    [60, 'seconds', 1], // 60
		    [120, '1 minute ago', '1 minute from now'], // 60*2
		    [3600, 'minutes', 60], // 60*60, 60
		    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
		    [86400, 'hours', 3600], // 60*60*24, 60*60
		    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
		    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
		    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
		    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
		    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
		    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
		    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
		    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
		    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
		    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		var seconds = (+new Date() - time) / 1000,
		    token = 'ago', list_choice = 1;

		if (seconds == 0) {
		    return 'Just now'
		}
		if (seconds < 0) {
		    seconds = Math.abs(seconds);
		    token = 'from now';
		    list_choice = 2;
		}
		var i = 0, format;
		while (format = time_formats[i++])
		    if (seconds < format[0]) {
		        if (typeof format[2] == 'string')
		            return format[list_choice];
		        else
		            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
		    }
		return time;
	}
    
}]);