app.service("employeeService", ["$http", "$q", function($http, $q){

	this.get = function(id){

		var deferred = $q.defer();

		$http.post("/data/employee/".concat(id))
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		})

		return deferred.promise;
	}

	this.getEmployees = function(pager){

		var deferred = $q.defer();

		$http.post("/data/employees", pager)
		.then(function(response){

			deferred.resolve(response.data)
		},
		function(err){

			deferred.reject("An error occured!")
		});

		return deferred.promise;	
	}

	this.getGenders = function(){

		return [

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
	}

	this.getMaritalStatus = function(){

		return [

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
	}
}])