app.service("taxReliefService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.getAll = function(pager){

		var deferred = $q.defer();

		$http.post("/data/taxrelief", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])