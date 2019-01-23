app.controller("benefitsController", [
								'$scope',
								'$http',
								'$state', 
								"$filter",
								'benefitsService', 
								function($scope, $http, $state, $filter, benefitsService){
	
	$scope.benefit_types = benefitsService.getType()

	$scope.submit = function(){

		// console.log($scope.type?$scope.type.id == "deduction":"")

		var benefit = {

			"name":$scope.name,
			"amount":$scope.amt,
			"descr":$scope.descr,
			"deduct":$scope.type?$scope.type.id == "deduction":"",
			"taxable":$scope.taxable == "Yes",
			"active":$scope.active == "Yes",
			"percentage":$scope.perc == "Yes"
		}

		var validator = validate(benefit, {

			name:{

				name:"Name",
				required:true,
			},
			amount:{

				name:"Amount",
				required:true,
				format:"currency"
			},
			deduct:{

				name:"Benefit/Deduction Type",
				required:true
			}
		})


		if(validator.isValid()){

			benefit = $.extend(benefit, validator.getSanitized())

			console.log(benefit)

			var benefitSvr;

			if(!!$scope.id){

				benefit.id = $scope.id;
				benefitSvr = benefitsService.update(benefit)
			}
			else benefitSvr = benefitsService.add(benefit)

			$("body").LoadingOverlay("show")

			benefitSvr.then(function(data){

				$scope.dialogBenefitsOpen = false;

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#benefits-tbl").trigger("refresh")

				}, 400)
			})
		}
		else validator.flushMessage("Benefit/Deduction")
	}

	$scope.cancelHandle = function(){

		$scope.dialogBenefitsOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogBenefitsOpen = true;

				$scope.name = "",
				$scope.amt = "",
				$scope.descr = "",
				$scope.perc = "No",
				$scope.deduct = "",
				$scope.taxable = "",
				$scope.active = ""
			})				
		})

		return [

			[btnAdd]
		]
	} 

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.dialogBenefitsOpen = true;

		benefitsService.get(row.id).then(function(data){

			$scope.id = row.id,
			$scope.name = data.name,
			$scope.amt = (!data.percentage)?$filter("currency")(data.amount,""):data.amount,
			$scope.descr = data.descr,
			$scope.perc = data.percentage?"Yes":"No",
			$scope.type = benefitsService.getType(data.deduct?"deduction":"benefit"),
			$scope.taxable = data.taxable?"Yes":"No",
			$scope.active = data.active?"Yes":"No"
		})
	}

	$scope.customLoader = function(table, options, builder){

		benefitsService.getBenefits(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var perc, amt;

			var _benefits = data.rows;

			var __benefits = [];

			for(idx in _benefits){

				perc = _benefits[idx].percentage

				if(perc)
					amt = _benefits[idx].amount.toString().concat("%")
				else 
					amt = $filter("currency")(_benefits[idx].amount, "")

				__benefits.push({

					"id":_benefits[idx].id,
					"name":_benefits[idx].name,
					"amount":amt,
					"deduct":_benefits[idx].deduct?"Yes":"No",
					"taxable":_benefits[idx].taxable?"Yes":"No",
					"active":_benefits[idx].active?"Yes":"No"
				})
			}

			data.rows = __benefits

			builder(table, data, options);
		})
	}	
}]);