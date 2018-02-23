app.controller("employeeController", ['$scope','$http', "$state", function($scope, $http, $state){

	$scope.genders = [

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
	];

	$scope.maritalStatus = [

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
	];

	$http.post("/data/post-list.json").then(function(response){

		$scope.posts = response.data
	})
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