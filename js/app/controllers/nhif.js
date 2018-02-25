app.controller("nhifController", ['$scope','$http', "$state", "$stateParams", "$filter", function($scope, $http, $state, $stateParams, $filter){

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

			$scope.lbound = row.lbound
			$scope.ubound = row.ubound
			$scope.amount = row.amt
			$scope.descr = row.descr
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

			var nhif_rows = response.data.rows;

			var nhif_list = []

			for(idx in nhif_rows){

				nhif_list.push({

					lbound:$filter("currency")(nhif_rows[idx].lbound, ""),
					ubound:$filter("currency")(nhif_rows[idx].ubound, ""),
					amt:$filter("currency")(nhif_rows[idx].amt, ""),
					descr:nhif_rows[idx].descr
				})
			}

			response.data.rows = nhif_list

			builder(table, response.data, options);
		});	
	}
}]);