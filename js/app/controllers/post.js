app.controller("postsController", ['$scope',
									'$http',
									'$state',
									'postService', 
									'deptService',
									function($scope, $http, $state, postService, deptService){

	function populateDeptSelectBox(scope, row){

		deptService.getList().then(function(data){

			$scope.depts = data
			$scope.dept = {}

			if(!$.isEmptyObject(row)){

				$scope.dept = {

					"id": row.dept_id,
					"descr":row.dept_name
				}
			}
		})
	}

	$scope.cancelHandle = function(){

		$scope.dialogPostOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogPostOpen = true;
				$scope.name = "";
				$scope.descr = "";

				populateDeptSelectBox($scope)
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogPostOpen = true;
			$scope.name = row.name
			$scope.descr = row.descr

			populateDeptSelectBox($scope, row)
		})
	}

	$scope.customLoader = function(table, options, builder){

		postService.getPosts(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		})
	}	
}]);