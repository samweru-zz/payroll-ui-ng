app.controller("payeController", ['$scope',
									'$http',
									'$state',
									"$filter", 
									"payeService",
									function($scope, $http, $state, $filter, payeService){

	$scope.$parent.active = 2

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

			$scope.annual_ubound = row.annual_ubound
			$scope.annual_lbound = row.annual_lbound
			$scope.monthly_ubound = row.monthly_ubound
			$scope.monthly_lbound = row.monthly_lbound
			$scope.tax_rate = row.tax_rate.replace("%","")
		})
	}

	$scope.customLoader = function(table, options, builder){

		payeService.getRates(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _paye = data.rows;

			for(idx in _paye){

				_paye[idx].annual_lbound = $filter("currency")(_paye[idx].annual_lbound, "")
				_paye[idx].annual_ubound = $filter("currency")(_paye[idx].annual_ubound, "")
				_paye[idx].monthly_lbound = $filter("currency")(_paye[idx].monthly_lbound, "")
				_paye[idx].monthly_ubound = $filter("currency")(_paye[idx].monthly_ubound, "")
				_paye[idx].tax_rate = _paye[idx].rate_perc + "%"
			}

			data.rows = _paye

			builder(table, data, options);
		})
	}
}]);