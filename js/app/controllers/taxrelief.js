app.controller("taxReliefController", ['$scope','$http', "$state", "$stateParams", "$filter", function($scope, $http, $state, $stateParams, $filter){

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			// $state.go("employee-add")				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		console.log(row);

		$scope.$apply(function(){

			// $scope.id = row.id
			$scope.name = row.name
			$scope.monthly = row.monthly
			$scope.active = row.active
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

			var relief_rows = response.data.rows;

			for(idx in relief_rows){

				relief_rows[idx].monthly = $filter("currency")(relief_rows[idx].monthly, "")
				relief_rows[idx].active = relief_rows[idx].active?"Yes":"No"
			}

			response.data.rows = relief_rows

			builder(table, response.data, options);
		});	
	}
}])
