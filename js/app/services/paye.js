app.service("payeService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.add = function(data){

		var deferred = $q.defer();

		$http.post("/paye/add", data)
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

		$http.post("/paye/update", data)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
	}

	this.getRates = function(pager){

		var deferred = $q.defer();

		$http.post("/paye/rates", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])