app.controller("periodController", ["$scope", 
									"$http", 
									"periodService", 
									function($scope, $http, periodService){

	$scope.status = periodService.getStatus()

	$scope.cancelHandle = function(){

		$scope.dialogPeriodOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogPeriodOpen = true;

				$scope.start_date = ""
				$scope.end_date = ""
				$scope.period_status = null
				$scope.active = "No"
			})				
		})

		var btnClose = $(document.createElement("BUTTON")).html("Close")
		btnClose.click(function(){

			//
		})

		return [

			[btnAdd, btnClose]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogPeriodOpen = true;

			$scope.start_date = new Date(row.start);
			$scope.end_date = new Date(row.end);
			$scope.period_status = $scope.status[row.status == "Open"?0:1]
			$scope.active = row.active

			$("input[type=submit]").attr("disabled", row.active == "No")
		})
	}

	$scope.customLoader = function(table, options, builder){

		periodService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _periods = data.rows

			for(idx in _periods)
    			_periods[idx].active = _periods[idx].active?"Yes":"No"

			builder(table, data, options);
		})
	}
}])