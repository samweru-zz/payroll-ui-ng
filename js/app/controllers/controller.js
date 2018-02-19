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

	// var btnEdit = $(document.createElement("BUTTON")).html("Edit")
	// btnEdit.click(function(){

	// 	var row = $("#employee-tbl").getSelectedRow();

	// 	if(Object.keys(row).length > 1)
	// 		$scope.$apply(function() {
	// 		  $location.path("/employee/".concat(row.id));
	// 		});
			
	// })

	// $("#employees-tbl")
	// 	.simplrGrid({

	// 		url:"data/employees.json",
	// 		method:"POST",
	// 		title:"Employees",
	// 		usePager:true,
	// 		singleSelect:true,
	// 		fixLeftColumn:true,
	// 		fixHeader:true,
	// 		resizeColumns:true,
	// 		columnHide:[

	// 			"id"
	// 		],
	// 		toolbars:[

	// 			// [btnEdit]	
	// 		],
	// 		css:{

	// 			capsuleWidth:"100%",
	// 			gridHeight:"400px",
	// 			gridWidth:"90%"
	// 		},
	// 		pager:{

	// 			page:1,
	// 			rows:10,
	// 			list:[10,20]
	// 		},
	// 		dblClick:function(){

	// 			var row = $(this).getRow();

	// 			$scope.$apply(function(){

	// 				$location.path("/employee/".concat(row.id));
	// 			});
	// 		},
	// 		customLoader:function(table, options, builder){

	// 			$http.post("/data/employees.json", {

	// 			    page:options.pager.page,
	// 			    rows:options.pager.rows
	// 			})
	// 			.then( function(response){

	// 				//total-number-of-rows/rows-per-page
	// 				options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

	// 				// console.log(response);

	// 				builder(table, response.data, options);
	// 			});	
	// 		}
	// 	})
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