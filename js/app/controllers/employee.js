app.controller("employeeController", [
					'$scope',
					"$stateParams", 
					"employeeService",
					"postService", 
					function($scope, $stateParams, employeeService, postService){

	$scope.genders = employeeService.getGenders();

	$scope.maritalStatus = employeeService.getMaritalStatus();

	if(Object.keys($stateParams).includes("id"))
		employeeService.get($stateParams["id"]).then(function(data){

			console.log(data)
		})

	postService.getList().then(function(data){

		$scope.posts = data
	})
}]);

app.controller("employeesController", ['$scope', '$http', '$httpBackend', "$state", "employeeService", function($scope, $http, $httpBackend, $state, employeeService){

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$state.go("employee-add")				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$state.go("employee-edit", {id:row.id})
	}

	$scope.customLoader = function(table, options, builder){

		employeeService.getEmployees(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		});	
	}
}]);