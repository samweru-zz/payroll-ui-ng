app.service("roleService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/data/role-list")
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

		$http.post("/data/roles", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])