app.controller("benefitsController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	// $scope.perc = 'False'

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.name = row.name
			$scope.amt = row.amount
			$scope.descr = row.descr
			$scope.perc = row.percentage
			$scope.deduct = row.deduct
			$scope.taxable = row.taxable
			$scope.active = row.active
	
		})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/benefits.json", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then(function(response){

			//total-number-of-rows/rows-per-page
			options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

			// console.log(response);
			builder(table, response.data, options);
		});	
	}	
}]);

app.controller("postsController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	$scope.cancelHandle = function(){

		$scope.dialogPostOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.dialogPostOpen = true;				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogPostOpen = true;
			// $scope.alias = row.alias
			// $scope.descr = row.descr
		})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/posts.json", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then(function(response){

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

	$scope.cancelHandle = function(){

		$scope.dialogDeptOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogDeptOpen = true;
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogDeptOpen = true;
			$scope.alias = row.alias
			$scope.descr = row.descr
		})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/depts.json", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then( function(response){

			console.log(response.data)

			//total-number-of-rows/rows-per-page
			options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

			// console.log(response);
			builder(table, response.data, options);
		});	
	}
}]);

app.controller("rolesController", ['$scope', '$http', '$httpBackend', "$state", function($scope, $http, $httpBackend, $state){

	$scope.cancelHandle = function(){

		$scope.dialogRoleOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogRoleOpen = true;
			})		
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogRoleOpen = true;
			$scope.name = row.name
			$scope.descr = row.descr
		})
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

// app.controller("roleController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

// 	console.log("Role")
// }]);

app.controller("userController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	$http.post("/data/role-list.json").then( function(response){

	 	$scope.roles = response.data;
	});
}]);

app.controller("employeeController", ['$scope','$http', "$state", function($scope, $http, $state){

	console.log("Employee")

	$http.post("/data/post-list.json").then( function(response){

		$scope.posts = response.data;

	 	$scope.genders = {

	 		"male":"Male",
	 		"female":"Female",
	 		"other":"Other"
	 	}

	 	$scope.maritalStatus = {

	 		"separated": "Separated",
	 		"married":"Married",
	 		"divorced":"Divorced"
	 	}
	});	
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