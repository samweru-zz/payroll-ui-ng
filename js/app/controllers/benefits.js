app.controller("benefitsController", ['$scope',
										'$http',
										'$state', 
										'benefitsService',
										function($scope, $http, $state, benefitsService){

	$scope.cancelHandle = function(){

		$scope.dialogBenefitsOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogBenefitsOpen = true;

				$scope.name = ""
				$scope.amt = ""
				$scope.descr = ""
				$scope.perc = ""
				$scope.deduct = ""
				$scope.taxable = ""
				$scope.active = ""
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogBenefitsOpen = true;

			$scope.name = row.name
			$scope.amt = row.amount
			$scope.descr = row.descr
			$scope.perc = row.percentage
			$scope.deduct = row.deduct
			$scope.taxable = row.taxable
			$scope.active = row.active
	
		})
	}

	$scope.customLoader = function(table, options, builder){

		benefitsService.getBenefits(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _benefits = data.rows;

			for(idx in _benefits){

				_benefits[idx].percentage = _benefits[idx].percentage?"Yes":"No"
				_benefits[idx].deduct = _benefits[idx].deduct?"Yes":"No"
				_benefits[idx].taxable = _benefits[idx].taxable?"Yes":"No"
				_benefits[idx].active = _benefits[idx].active?"Yes":"No"
			}

			data.rows = _benefits

			builder(table, data, options);
		})
	}	
}]);