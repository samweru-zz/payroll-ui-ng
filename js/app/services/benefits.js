app.service("benefitsService", ["$http", "$q", function($http, $q){

	this.getList = function(){

		//
	}

	this.get = function(id){

		var deferred = $q.defer();

		$http.post("/data/benefit/".concat(id))
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;
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

	this.getType = function(id){

		var benefit_types = [

			{
				id:"benefit",
				name:"Benefit"
			},
			{
				id:"deduction",
				name:"Deduction"
			}
		]

		if(!!id){

			id = id.toLowerCase()
			for(idx in benefit_types)
				if(benefit_types[idx].id == id)
					return benefit_types[idx];
		}

		return benefit_types
	}
}])