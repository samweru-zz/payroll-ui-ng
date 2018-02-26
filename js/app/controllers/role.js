app.controller("rolesController", ['$scope', 
									'$http',  
									"roleService", 
									function($scope, $http, roleService){

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

		roleService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);	
		})
	}
}]);