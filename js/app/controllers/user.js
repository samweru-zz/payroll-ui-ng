app.controller("usersController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	function populateRolesSelectBox(scope, row){

		$http.post("/data/role-list").then(function(response){

			// console.log(row);

			$scope.roles = response.data

			if(!$.isEmptyObject(row)){

				$scope.role = {

					"id": row.role_id,
					"name":row.role_name
				}
			}
			else{

				$scope.role = {}
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

		$http.post("/data/users", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then(function(response){

			// console.log(response.data)

			//total-number-of-rows/rows-per-page
			options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

			// console.log(response);
			builder(table, response.data, options);
		});	
	}
}]);