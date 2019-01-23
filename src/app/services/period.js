app.service("periodService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.closePeriod = function(id){

		var deferred = $q.defer();

		$http.post("/period/" + id + "/close")
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.get = function(id){

		var deferred = $q.defer();

		$http.post("/period/".concat(id))
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.add = function(data){

		var deferred = $q.defer();

		$http.post("/period/add", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.update = function(data){

		var deferred = $q.defer();

		$http.post("/period/update", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.getAll = function(pager){

		var deferred = $q.defer();

		$http.post("/periods", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}

	this.getStatus = function(){

		return [

			{
				"id":"new",
				"name":"New/Open"
			},
			{
				"id":"closed",
				"name":"Closed"
			}
		]
	}
}])