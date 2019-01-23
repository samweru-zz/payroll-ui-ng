app.controller("nhifController", ['$scope',
									'$http', 
									'$state',
									"$stateParams", 
									"$filter",
									"nhifService",
									function($scope, $http, $state, $stateParams, $filter, nhifService){

	$scope.$parent.active = 1

	$scope.submit = function(){

		var nhif = {

			id:$scope.id,
			lbound:$scope.lbound,
			ubound:$scope.ubound,
			amt:$scope.amount
		}

		var validator = validate(nhif, {

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
			amt:{

				name:"Amount",
				format:"currency",
				required:true
			}
		})

		// console.log(validator.getState())

		if(validator.isValid()){

			nhif = validator.getSanitized()

			var nhifSrv;
			if(!!$scope.id){

				nhif.id = $scope.id
				nhifSrv = nhifService.update(nhif)
			}
			else nhifSrv = nhifService.add(nhif)

			$("body").LoadingOverlay("show")

			nhifSrv.then(function(data){

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#nhif-tbl").trigger("refresh")

					$scope.addNew()
					
				}, 400)
			})
		}
		else validator.flushMessage("NHIF")
	}

	$scope.addNew = function(){

		$scope.disableNew = true

		$scope.id = ""
		$scope.lbound = ""
		$scope.ubound = ""
		$scope.amount = ""
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.disableNew = false

			$scope.id = row.id
			$scope.lbound = row.lbound
			$scope.ubound = row.ubound
			$scope.amount = row.amt
		})
	}

	$scope.customLoader = function(table, options, builder){

		nhifService.getRates(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _nhif = data.rows;

			var __nhif = []

			for(idx in _nhif){

				__nhif.push({

					"id":_nhif[idx].id,
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