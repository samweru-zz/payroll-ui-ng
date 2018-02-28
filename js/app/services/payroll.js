app.service("payrollService", ["$http", "$q", "employeeService", function($http, $q, employeeService){

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/data/benefits-list").then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getEmployeeNameById = function(id){

		var deferred = $q.defer();

		employeeService.get(id).then(function(data){

			deferred.resolve({

				"firstname": data.firstname,
				"lastname": data.lastname
			})
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise
	}

	this.getEmployeeBenefits = function(id){

		var deferred = $q.defer();

		$http.post("/data/employee/".concat(id)+"/benefits").then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}
}])