app.service("deptService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/dept/list")
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getDepts = function(pager){

		var deferred = $q.defer();

		$http.post("/depts", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])