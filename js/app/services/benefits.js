app.service("benefitsService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.getBenefits = function(pager){

		var deferred = $q.defer();

		$http.post("/data/benefits", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}
}])