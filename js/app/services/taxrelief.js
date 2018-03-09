app.service("taxReliefService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.add = function(data){

		var deferred = $q.defer();

		$http.post("/taxrelief/add", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.update = function(data){

		var deferred = $q.defer();

		$http.post("/taxrelief/update", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.getAll = function(pager){

		var deferred = $q.defer();

		$http.post("/taxrelief", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])