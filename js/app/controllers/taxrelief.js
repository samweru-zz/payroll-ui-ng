app.controller("taxReliefController", ['$scope',
										'$http',
										'$state',
										"$filter", 
										"taxReliefService",
										function($scope, $http, $state, $filter, taxReliefService){

	$scope.$parent.active = 3

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			//			
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			// $scope.id = row.id
			$scope.name = row.name
			$scope.amount = row.amt
			$scope.active = row.active
		})
	}

	$scope.customLoader = function(table, options, builder){

		taxReliefService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _relief = data.rows;

			for(idx in _relief){

				_relief[idx].amt = $filter("currency")(_relief[idx].amt, "")
				_relief[idx].active = _relief[idx].active?"Yes":"No"
			}

			data.rows = _relief

			builder(table, data, options);
		})
	}
}])
