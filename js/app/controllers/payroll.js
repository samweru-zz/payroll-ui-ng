app.controller("payrollController", [
					"$scope",
					"$http", 
					"$state",
					"$stateParams",
					"$filter",
					"payrollService", 
					function($scope, $http, $state, $stateParams, $filter, payrollService){

	$scope.$parent.active = 2

	payrollService.getSalaryDetails($stateParams.id).then(function(data){

		$scope.employeeName = data.employee.firstname + " " + data.employee.lastname
		$scope.benefits = data.benefits

		// console.log(data.pay_details)

		if(data.pay_details){

			$scope.pay = {

				id:data.pay_details.id,
				salary:$filter("currency")(data.pay_details.salary,""),
				in_relief:$filter("currency")(data.pay_details.insurance_relief,"")
			}
		}
		else{

			$scope.mask = false

			$scope.pay = {

				salary:"0.00",
				in_relief:"0.00"
			}
		}
	})

	$scope.okHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.submit = function(){

		$("body").LoadingOverlay("show")

		var employee_pay = {

			employee:parseInt($stateParams.id),
			salary:parseFloat($scope.pay.salary.replace(",","")),
			insurance_relief:parseFloat($scope.pay.in_relief.replace(",",""))
		}

		var id = ""
		var empPaySrv;

		if(!!$scope.pay.id){

			employee_pay.id = parseInt($scope.pay.id)
			empPaySrv = payrollService.updatePayDetails(employee_pay)
		}
		else empPaySrv = payrollService.addPayDetails(employee_pay)

		empPaySrv.then(function(data){

			setTimeout(function(){

				$("body").LoadingOverlay("hide")

			}, 100)
		})
	}

	$scope.removeEmployeeBenefit = function(){

		var row = $("#benefits-tbl").getSelectedRow()

		if(JSON.stringify(row) == "{}"){

			$scope.dialogMsgOpen = true;
			$scope.message = "Please select row from table!"
		}
		else{

			var employee_id = $stateParams.id
			var benefit_id = row.id

			payrollService.removeEmployeeBenefit(employee_id, benefit_id).then(function(data){

				$("#benefits-tbl").trigger("refresh")
			})
		}
	}

	$scope.addEmployeeBenefit = function(){

		var employee_id = $stateParams.id;

		if($scope.benefit){

			payrollService.addEmployeeBenefit(employee_id, $scope.benefit).then(function(data){

				$("#benefits-tbl").trigger("refresh")
			})

		    $scope.benefit = null
		}
	}

	$scope.customLoader = function(table, options, builder){

		payrollService.getEmployeeBenefits($stateParams.id).then(function(data){

			options.pager.pages = 1

			builder(table, data, options);
		});
	}
}])