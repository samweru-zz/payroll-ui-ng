app.controller("deptsController", ['$scope', 
									'$http', 
									"$state", 
									"deptService",
									function($scope, $http, $state, deptService){

	$scope.submit = function(){

		var dept = {

			alias: $scope.alias,
			descr:$scope.descr
		}

		var validator = validate(dept, {

			alias:{

				name:"Alias",
				format:"alphaOrNumericOrBoth",
				required:true
			}
		})

		if(validator.isValid()){

			dept = $.extend(dept, validator.getSanitized())

			if(!!$scope.id){

				dept.id = $scope.id
				deptSrv = deptService.update(dept)
			}
			else deptSrv = deptService.add(dept)
			
			$("body").LoadingOverlay("show")

			deptSrv.then(function(data){

				$scope.dialogDeptOpen = false;

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#depts-tbl").trigger("refresh")

				}, 400)
			})
		}
		else validator.flushMessage("Department")
	}

	$scope.cancelHandle = function(){

		$scope.dialogDeptOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogDeptOpen = true;

				$scope.id = ""
				$scope.alias = ""
				$scope.descr = ""
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		deptService.get(row.id).then(function(data){

			$scope.dialogDeptOpen = true;

			$scope.id = data.id
			$scope.alias = data.alias
			$scope.descr = data.descr
		})
	}

	$scope.customLoader = function(table, options, builder){

		deptService.getDepts(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		})
	}
}]);