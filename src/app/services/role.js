app.service("roleService", ["$http", "$q", function($http, $q){

	this.add = function(data){

		var deferred = $q.defer();

		$http.post("/role/add", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.update = function(data){

		var deferred = $q.defer();

		$http.post("/role/update", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.get = function(role_id){

		var deferred = $q.defer();

		$http.post("/role/".concat(role_id))
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/role/list")
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getAll = function(pager){

		var deferred = $q.defer();

		$http.post("/roles", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])