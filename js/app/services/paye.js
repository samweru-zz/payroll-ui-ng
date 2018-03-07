app.service("payeService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
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