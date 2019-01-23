app.controller("rolesController", ['$scope', 
									'$http',  
									"roleService", 
									function($scope, $http, roleService){

	$scope.cancelHandle = function(){

		$scope.dialogRoleOpen = false;
	}

	$scope.submit = function(){

		var role = {

			name:$scope.name,
			descr:$scope.descr
		}

		var validator = validate(role, {

			name:{

				name:"Name",
				required:true
			}
		})

		if(validator.isValid()){

			role = $.extend(role, validator.getSanitized())

			var roleSrv;

			if(!!$scope.id){

				role.id = $scope.id
				roleSrv = roleService.update(role)
			}
			else roleSrv = roleService.add(role)

			$("body").LoadingOverlay("show")

			roleSrv.then(function(data){

				$scope.dialogRoleOpen = false;

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#roles-tbl").trigger("refresh")
					
				}, 400)
			})
		}
		else validator.flushMessage("Roles")
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogRoleOpen = true;

				$scope.id = ""
				$scope.name = ""
				$scope.descr = ""
			})		
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		roleService.get(row.id).then(function(data){

			$scope.dialogRoleOpen = true;
			
			$scope.id = data.id
			$scope.name = data.name
			$scope.descr = data.descr
		})
	}

	$scope.customLoader = function(table, options, builder){

		roleService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);	
		})
	}
}]);