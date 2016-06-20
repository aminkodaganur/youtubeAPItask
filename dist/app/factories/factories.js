youtubeApp.factory('autoComplete', function($http){
	return {
		list: function(query,callback){
	    	$http
	    		.jsonp("https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key=AIzaSyAWBYy__s8QXHlVU2tnm4XTXtmCkphRbJQ&format=5&alt=json&callback=JSON_CALLBACK")
	    		.success(callback);
	  	}
	};
});