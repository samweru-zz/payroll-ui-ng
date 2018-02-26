app.controller("usersController", ['$scope',
									'$http',
									'userService',
									'roleService', 
									function($scope, $http, userService, roleService){

	function populateRolesSelectBox(scope, row){

		roleService.getList().then(function(data){

			$scope.roles = data
			$scope.role = {}

			if(!$.isEmptyObject(row)){

				$scope.role = {

					"id": row.role_id,
					"name":row.role_name
				}
			}
		})
	}

	$scope.cancelMsgHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.cancelResetPassHandle = function(){

		$scope.dialogResetPassOpen = false;
	}
	
	$scope.cancelUserHandle = function(){

		$scope.dialogUserOpen = false;
	}

	$scope.okHandle = function(){

		$scope.dialogResetPassOpen = false
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogUserOpen = true;
				$scope.username = ""

				populateRolesSelectBox($scope)
			})		
		})

		var btnReset = $(document.createElement("BUTTON")).html("Reset")
		btnReset.click(function(){
			
			$scope.$apply(function(){

				if($("tr.selected").length>0){

					$scope.message = "Are you sure you want to continue with this action?"
					$scope.dialogResetPassOpen = true
				}
				else{

					$scope.infomessage = "Please select a row in the grid."
					$scope.dialogMsgOpen = true
				}
			})
		})

		return [

			[btnAdd, btnReset]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogUserOpen = true;
			$scope.username = row.username

			populateRolesSelectBox($scope, row);
		})
	}

	$scope.customLoader = function(table, options, builder){

		userService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		})
	}
}]);