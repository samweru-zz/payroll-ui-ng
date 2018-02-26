app.controller("deptsController", ['$scope', 
									'$http', 
									"$state", 
									"deptService",
									function($scope, $http, $state, deptService){

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

		deptService.getDepts(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		})
	}
}]);