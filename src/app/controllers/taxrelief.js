app.controller("taxReliefController", ['$scope',
										'$http',
										'$state',
										"$filter", 
										"taxReliefService",
										function($scope, $http, $state, $filter, taxReliefService){

	$scope.$parent.active = 3

	$scope.submit = function(){

		var relief = {

			name:$scope.name,
			amt:$scope.amount,
			active:$scope.active == "Yes"
		}

		var validator = validate(relief,{

			name:{

				name:"Name",
				format:"alphaOrNumericOrBoth",
				required:true
			},
			amt:{

				name:"Amount",
				format:"currency",
				required:true
			}
		})

		if(validator.isValid()){

			relief = $.extend(relief, validator.getSanitized())

			var taxReliefSrv;
			if(!!$scope.id){

				relief.id = $scope.id
				taxReliefSrv = taxReliefService.update(relief)
			}
			else taxReliefSrv = taxReliefService.add(relief)

			$("body").LoadingOverlay("show")

			taxReliefSrv.then(function(data){

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#relief-tbl").trigger("refresh")
					
					$scope.addNew()

				},400)
			})
		}
		else validator.flushMessage("Tax Relief")
	}

	$scope.addNew = function(){

		$scope.newDisable = true
		$scope.id = ""
		$scope.name = ""
		$scope.amount = ""
		$scope.active = "No"
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.newDisable = false

			$scope.id = row.id
			$scope.name = row.name
			$scope.amount = row.amount
			$scope.active = row.active
		})
	}

	$scope.customLoader = function(table, options, builder){

		taxReliefService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _relief = data.rows;

			for(idx in _relief){

				_relief[idx].amount = $filter("currency")(_relief[idx].amount, "")
				_relief[idx].active = _relief[idx].active?"Yes":"No"
			}

			data.rows = _relief

			builder(table, data, options);
		})
	}
}])
