app.controller("payrollController", [
					"$scope",
					"$http", 
					"$state",
					"$stateParams",
					"payrollService", function($scope, $http, $state, $stateParams, payrollService){

	$scope.$parent.active = 2

	payrollService.getEmployeeNameById($stateParams.id).then(function(data){

		$scope.employeeName = data.firstname + " " + data.lastname
	})

	payrollService.getList().then(function(data){

		$scope.benefits = data
	})

	// $scope.toolbars = function(){

	// 	//
	// }

	$scope.dblClick = function(){

		//
	}

	$scope.customLoader = function(table, options, builder){

		payrollService.getEmployeeBenefits($stateParams.id).then(function(data){

			// console.log(data)

			options.pager.pages = 1

			builder(table, data, options);
		});
	}
}])