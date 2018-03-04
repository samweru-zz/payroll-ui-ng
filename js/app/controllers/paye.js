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

			$scope.ubound = row.ubound
			$scope.lbound = row.lbound
			$scope.tax_rate = row.rate_perc.replace("%","")
		})
	}

	$scope.customLoader = function(table, options, builder){

		payeService.getRates(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _paye = data.rows;

			for(idx in _paye){

				_paye[idx].lbound = $filter("currency")(_paye[idx].lbound, "")
				_paye[idx].ubound = $filter("currency")(_paye[idx].ubound, "")
				_paye[idx].rate_perc = _paye[idx].rate_perc + "%"
			}

			data.rows = _paye

			builder(table, data, options);
		})
	}
}]);