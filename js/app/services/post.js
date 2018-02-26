app.service("postService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/data/post-list")
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getPosts = function(pager){

		var deferred = $q.defer();

		$http.post("/data/posts", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])