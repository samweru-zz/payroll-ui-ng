app.controller("payeController", ['$scope',
									'$http',
									'$state',
									"$filter", 
									"payeService",
									function($scope, $http, $state, $filter, payeService){

	$scope.$parent.active = 2

	$scope.addNew = function(){

		$scope.disableNew = true

		$scope.id = ""
		$scope.ubound = ""
		$scope.lbound = ""
		$scope.tax_rate = ""
	}

	$scope.submit = function(){

		var paye = {

			ubound:$scope.ubound,
			lbound:$scope.lbound,
			rate_perc:$scope.tax_rate
		}

		var validator = validate(paye, {

			lbound:{

				name:"Lower Bound",
				format:"currency",
				required:true
			},
			ubound:{

				name:"Upper Bound",
				format:"currency",
				required:true
			},
			rate_perc:{

				name:"Rate",
				format:"number",
				range:{

					from:1,
					to:100
				},
				required:true
			}
		})

		// console.log(validator.getState())

		if(validator.isValid()){

			paye = validator.getSanitized()

			var payeSrv;
			if(!!$scope.id){

				paye.id = $scope.id
				payeSrv = payeService.update(paye)
			}
			else payeSrv = payeService.add(paye)

			$("body").LoadingOverlay("show")

			payeSrv.then(function(data){

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#paye-tbl").trigger("refresh")

					$scope.addNew()

				}, 400)
			})
		}
		else validator.flushMessage("PAYE")
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.disableNew = false

			$scope.id = row.id
			$scope.ubound = row.ubound
			$scope.lbound = row.lbound
			$scope.tax_rate = row.rate_perc.replace("%","")
		})
	}

	$scope.customLoader = function(table, options, builder){

		payeService.getRates(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _paye = data.rows;

			for(idx in _paye){

				_paye[idx].lbound = $filter("currency")(_paye[idx].lbound, "")
				_paye[idx].ubound = $filter("currency")(_paye[idx].ubound, "")
				_paye[idx].rate_perc = _paye[idx].rate_perc + "%"
			}

			data.rows = _paye

			builder(table, data, options);
		})
	}
}]);