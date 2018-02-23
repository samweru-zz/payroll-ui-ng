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