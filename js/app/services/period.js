app.service("periodService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
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
				"name":"New"
			},
			{
				"id":"closed",
				"name":"Closed"
			}
		]
	}
}])