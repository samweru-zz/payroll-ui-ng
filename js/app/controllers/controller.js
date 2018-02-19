app.controller("userController", ['$scope','$http','$httpBackend', function($scope, $http, $httpBackend){

	// $http.post("/data/roles.json").then( function(response){

	// 	var _roles = response.data;

	// 	var roles_data = {};
	// 	for(idx in _roles)
	// 		roles_data[_roles[idx]["id"]] = _roles[idx]["name"];

	//  	$scope.roles = roles_data;
	// });	
	console.log("User")
}]);

app.controller("employeeController", ['$scope','$http', function($scope, $http){

	console.log("Employee")

	// $http.get("data/employee.json").then( function(response){

	// 	var employee = response.data;

	//  	$scope.genders = employee.genders;
	//  	$scope.maritalStatus = employee.maritalStatus;
	// });	
}]);

app.controller("employeesController", ['$scope', '$http', '$httpBackend', "$location", function($scope, $http, $httpBackend, $location){

	console.log("EmployeeS")

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$location.path("/employee/add");
			});				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$location.path("/employee/".concat(row.id));
		});
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/employees.json", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then( function(response){

			//total-number-of-rows/rows-per-page
			options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

			// console.log(response);
			builder(table, response.data, options);
		});	
	}
}]);

app.controller("loginController", ['$scope','$http', '$httpBackend', function($scope, $http, $httpBackend){

	$scope.okHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.submit = function(){

		$http.post("/data/login.json").then(function(response){

			if($scope.username == response.data.username && 
			 	$scope.password == response.data.password){

			 		$scope.dialogLoginOpen = false;
			}
			else{

			 	$scope.message = "Invalid Credentials!";
			 	$scope.dialogMsgOpen = true;
			}

		});
	}	
}]);