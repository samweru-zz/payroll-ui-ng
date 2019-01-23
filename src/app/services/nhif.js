app.service("nhifService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.add = function(pager){

		var deferred = $q.defer();

		$http.post("/nhif/add", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}

	this.update = function(pager){

		var deferred = $q.defer();

		$http.post("/nhif/update", pager)
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

		$http.post("/nhif/rates", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])