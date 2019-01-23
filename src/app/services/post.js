app.service("postService", ["$http", "$q", function($http, $q){

	this.add = function(data){

		var deferred = $q.defer();

		$http.post("/post/add", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.update = function(data){

		var deferred = $q.defer();

		$http.post("/post/update", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.get = function(id){

		var deferred = $q.defer();

		$http.post("/post/".concat(id))
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/post/list")
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

		$http.post("/posts", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])