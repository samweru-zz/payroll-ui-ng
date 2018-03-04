app.controller("nhifController", ['$scope',
									'$http', 
									'$state',
									"$stateParams", 
									"$filter",
									"nhifService",
									function($scope, $http, $state, $stateParams, $filter, nhifService){

	$scope.$parent.active = 1

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

			var __nhif = []

			for(idx in _nhif){

				__nhif.push({

					"lbound":$filter("currency")(_nhif[idx].lbound, ""),
					"ubound":$filter("currency")(_nhif[idx].ubound, ""),
					"amt":$filter("currency")(_nhif[idx].amt, "")
				})
			}

			data.rows = __nhif

			builder(table, data, options);
		})	
	}
}]);