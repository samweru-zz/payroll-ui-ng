app.controller("benefitsController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	// $scope.perc = 'False'

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

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

		$http.post("/data/benefits", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then(function(response){

			//total-number-of-rows/rows-per-page
			options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

			// console.log(response);
			builder(table, response.data, options);
		});	
	}	
}]);