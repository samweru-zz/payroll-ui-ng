app.controller("employeeController", [
					"$scope",
					"$stateParams", 
					"employeeService",
					"postService", 
					function($scope, $stateParams, employeeService, postService){

	$scope.genders = employeeService.getGenders();
	$scope.maritalStatus = employeeService.getMaritalStatus();

	postService.getList().then(function(list){

		$scope.posts = list
	})

	if(Object.keys($stateParams).includes("id"))
		employeeService.get($stateParams.id).then(function(data){

			$scope.employee = {

				idno:data.idno,
				nssf:data.nssf_no,
				nhif:data.nhif_no,
				pin:data.pin,
				email1:data.email,
				phone1:data.mobile,
				address1:data.address,
				mStatus:employeeService.getMaritalStatus(data.marital_status),
				gender:employeeService.getGenders(data.gender),
				surname:data.lastname,
				othernames:data.firstname,
				// county:data.county,
				country:data.country,
				city:data.city,
				dob:data.dob,
				start_date:data.start_date,
				end_date:data.end_date,
				bank_details:data.bank_details,
				// other_address:data.other_address,
				// other_email:data.other_email,
				// other_mobile:data.other_mobile,
				active:data.status,
				// post:""
			}

			$scope.employee.post = $scope.posts.find(function(e){

				return data.post == e.id
			})
		})
}]);

app.controller("employeesController", ['$scope', '$http', '$httpBackend', "$state", "employeeService", function($scope, $http, $httpBackend, $state, employeeService){

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$state.go("employee-add")				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		$state.go("employee-edit", {id:row.id})
	}

	$scope.customLoader = function(table, options, builder){

		employeeService.getEmployees(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		});	
	}
}]);