app.controller("benefitController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	console.log("Benefit")
}]);

app.controller("postsController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$state.go("post-add")				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$state.go("post-edit", {id:row.id})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/posts.json", {

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

app.controller("postController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	console.log("Post")	
}]);

app.controller("deptController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	console.log("Dept")	
}]);

app.controller("deptsController", ['$scope', '$http', '$httpBackend', "$state", function($scope, $http, $httpBackend, $state){

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$state.go("dept-add")				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$state.go("dept-edit", {id:row.id})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/depts.json", {

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

app.controller("rolesController", ['$scope', '$http', '$httpBackend', "$state", function($scope, $http, $httpBackend, $state){

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$state.go("role-add")				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$state.go("role-edit", {id:row.id})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/roles.json", {

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

app.controller("roleController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	console.log("Role")
}]);

app.controller("userController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	$http.post("/data/role-list.json").then( function(response){

		var _roles = response.data;

		var roles_data = {};
		for(idx in _roles)
			roles_data[_roles[idx]["id"]] = _roles[idx]["name"];

	 	$scope.roles = roles_data;
	});
}]);

app.controller("employeeController", ['$scope','$http', "$state", function($scope, $http, $state){

	console.log("Employee")

	// $http.get("data/employee.json").then( function(response){

	// 	var employee = response.data;

	//  	$scope.genders = employee.genders;
	//  	$scope.maritalStatus = employee.maritalStatus;
	// });	
}]);

app.controller("employeesController", ['$scope', '$http', '$httpBackend', "$state", function($scope, $http, $httpBackend, $state){

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