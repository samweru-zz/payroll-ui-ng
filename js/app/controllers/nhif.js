app.controller("nhifController", ['$scope',
									'$http', 
									"$stateParams", 
									"$filter",
									"nhifService",
									function($scope, $http, $stateParams, $filter, nhifService){

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

			$scope.lbound = row.lbound
			$scope.ubound = row.ubound
			$scope.amount = row.amt
			$scope.descr = row.descr
		})
	}

	$scope.customLoader = function(table, options, builder){

		nhifService.getRates(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _nhif = data.rows;

			for(idx in _nhif){

				_nhif[idx].lbound = $filter("currency")(_nhif[idx].lbound, ""),
				_nhif[idx].ubound = $filter("currency")(_nhif[idx].ubound, ""),
				_nhif[idx].amt = $filter("currency")(_nhif[idx].amt, ""),
				_nhif[idx].descr = _nhif[idx].descr
			}

			data.rows = _nhif

			builder(table, data, options);
		})	
	}
}]);