app.service("employeeService", ["$http", "$q", function($http, $q){

	this.update = function(data){

		var deferred = $q.defer();

		$http.post("/employee/update", data)
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

		$http.post("/employee/".concat(id)).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getEmployees = function(pager){

		var deferred = $q.defer();

		$http.post("/employees", pager).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}

	this.getGenders = function(id){

		var genders = [

			{
				id:"male",
				name: "Male"
			},
			{
				id:"female",
				name:"Female"
			},
			{
				id:"other",
				name:"Other"
			}
		]

		if(!!id){

			id = id.toLowerCase()
			for(idx in genders)
				if(genders[idx].id == id)
					return genders[idx];
		}

		return genders;
	}

	this.getMaritalStatus = function(id){

		var mStatus = [

			{
				id:"married",
				name: "Married"
			},
			{
				id:"divorced",
				name:"Divorced"
			},
			{
				id:"separated",
				name:"Separated"
			}
		]

		if(!!id){

			id = id.toLowerCase()
			for(idx in mStatus)
				if(mStatus[idx].id == id)
					return mStatus[idx];
		}

		return mStatus;
	}	
}])