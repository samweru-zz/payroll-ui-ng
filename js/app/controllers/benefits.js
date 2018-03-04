app.controller("benefitsController", benefitsController)

benefitsController.$inject = ['$scope',
								'$http',
								'$state', 
								"$filter",
								'benefitsService'];

function benefitsController($scope, $http, $state, $filter, benefitsService){

	$scope.benefit_types = [

		{
			id:"benefit",
			name:"Benefit"
		},
		{
			id:"deduction",
			name:"Deduction"
		}
	]

	$scope.cancelHandle = function(){

		$scope.dialogBenefitsOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogBenefitsOpen = true;

				$scope.name = ""
				$scope.amt = ""
				$scope.descr = ""
				$scope.perc = ""
				$scope.deduct = ""
				$scope.taxable = ""
				$scope.active = ""
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$scope.$apply(function(){

			$scope.dialogBenefitsOpen = true;

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

		benefitsService.getBenefits(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _benefits = data.rows;

			var perc, amt;

			var __benefits = [];

			for(idx in _benefits){

				perc = _benefits[idx].percentage

				if(perc)
					amt = _benefits[idx].amount.toString().concat("%")
				else 
					amt = $filter("currency")(_benefits[idx].amount, "")

				__benefits.push({

					"name":_benefits[idx].name,
					"amount":amt,
					"deduct":_benefits[idx].deduct?"Yes":"No",
					"taxable":_benefits[idx].taxable?"Yes":"No",
					"active":_benefits[idx].active?"Yes":"No"
				})
			}

			data.rows = __benefits

			builder(table, data, options);

			table.find("td[name='amount']").each(function(idx, j){

				var val = $(this).has("div").find("div").html()

				if(val == "")
					val = $(this).html()

				if(!/\%/.test(val))
					$(this).children().css({

						textAlign:"right"
					})
					.parent().css({

						paddingRight:"10px"
					})
			})
		})
	}	
};