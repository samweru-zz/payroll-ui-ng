app.service("userService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.getAll = function(pager){

		var deferred = $q.defer();

		$http.post("/users", pager).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}

	this.doAuth = function(username, password){

		var deferred = $q.defer();

		$http.post("/login", {"username":username, "password":password}).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}
}])