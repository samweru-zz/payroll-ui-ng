app.service("userService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.get = function(id){

		var deferred = $q.defer();

		$http.post("/user/".concat(id)).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.add = function(user){

		var deferred = $q.defer();

		$http.post("/user/add", user).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.update = function(user){

		var deferred = $q.defer();

		$http.post("/user/update", user).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
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