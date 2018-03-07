app.service("deptService", ["$http", "$q", function($http, $q){

	this.get = function(id){

		var deferred = $q.defer();

		$http.post("/dept/".concat(id))
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.add = function(data){

		var deferred = $q.defer();

		$http.post("/dept/add", data)
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

		$http.post("/dept/update", data)
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