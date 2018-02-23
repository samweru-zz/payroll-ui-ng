app.controller("periodController", ["$scope", "$http", "$httpBackend", "$state", function($scope, $http, $httpBackend, $state){

	$scope.status = [

		{
			"id":"new",
			"name":"New"
		},
		{
			"id":"closed",
			"name":"Closed"
		}
	]

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.start_date = new Date(row.start);
			$scope.end_date = new Date(row.end);
			$scope.period_status = $scope.status[row.status == "Open"?0:1]
			$scope.active = row.active

			$("input[type=submit]").attr("disabled", row.active == "No")
		})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post(options.url, {

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
}])