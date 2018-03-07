app.service("payrollService", ["$http", "$q", "employeeService", function($http, $q, employeeService){

	this.getList = function(){

		var deferred = $q.defer();

		$http.post("/benefits/list").then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.addPayDetails = function(data){

		var deferred = $q.defer();

		$http.post("/add/employee/pay", data).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.updatePayDetails = function(data){

		var deferred = $q.defer();

		$http.post("/update/employee/pay", data).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.removeEmployeeBenefit = function(employee_id, benefit_id){

		var deferred = $q.defer();

		$http.delete("/employee/" + employee_id + "/remove/benefit/" + benefit_id).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.addEmployeeBenefit = function(employee_id, benefit_id){

		var deferred = $q.defer();

		$http.post("/employee/" + employee_id + "/add/benefit/" + benefit_id).then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			console.log(err)

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getSalaryDetails = function(employee_id){

		var deferred = $q.defer();

		$http.post("/employee/" + employee_id + "/payroll").then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getEmployeeBenefits = function(employee_id){

		var deferred = $q.defer();

		$http.post("/employee/" + employee_id + "/benefits").then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}
}])