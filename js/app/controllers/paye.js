app.controller("payeController", ['$scope','$http', "$state", "$stateParams", "$filter", function($scope, $http, $state, $stateParams, $filter){

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

			$scope.annual_ubound = row.annual_ubound
			$scope.annual_lbound = row.annual_lbound
			$scope.monthly_ubound = row.monthly_ubound
			$scope.monthly_lbound = row.monthly_lbound
			$scope.tax_rate = row.tax_rate.replace("%","")
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

			var paye_list = []

			var paye_rows = response.data.rows;

			for(idx in paye_rows){

				paye_list.push({

					annual_lbound:$filter("currency")(paye_rows[idx].annual_lbound, ""),
					annual_ubound:$filter("currency")(paye_rows[idx].annual_ubound, ""),
					monthly_lbound:$filter("currency")(paye_rows[idx].monthly_lbound, ""),
					monthly_ubound:$filter("currency")(paye_rows[idx].monthly_ubound, ""),
					tax_rate:paye_rows[idx].rate_perc + "%"
				})
			}

			response.data.rows = paye_list

			builder(table, response.data, options);
		});	
	}
}]);