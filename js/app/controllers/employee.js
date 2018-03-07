app.controller("employeeController", [
					"$scope",
					"$state",
					"$stateParams", 
					"employeeService",
					"postService",
					"$cookies", 
					function($scope, $state, $stateParams, employeeService, postService, $cookies){

	$scope.$parent.active = 1

	$scope.genders = employeeService.getGenders();
	$scope.maritalStatus = employeeService.getMaritalStatus();

	postService.getList().then(function(list){

		$scope.posts = list
	})

	if(Object.keys($stateParams).includes("id"))
		employeeService.get($stateParams.id).then(function(data){

			$scope.employee = {

				id:$stateParams.id,
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
				dob:new Date(data.dob),
				start_date: new Date(data.start_date),
				end_date:new Date(data.end_date),
				bank_details:data.bank_details,
				other_address:data.other_address,
				other_email:data.other_email,
				other_mobile:data.other_mobile,
				active:data.status,
				// post:""
			}

			$scope.employee.post = $scope.posts.find(function(e){

				return data.post == e.id
			})
		})

		$scope.submit = function(){

			var employee = $scope.employee;

			var employee_data = {

				id:employee.id,
				idno: employee.idno,
				nssf_no: employee.nssf,
				nhif_no: employee.nhif,
				pin: employee.pin,
				email: employee.email1,
				mobile: employee.mobile, 
				status: employee.active,
				address: employee.address1,
				marital_status: employee.married,
				gender: employee.gender.name,
				lastname: employee.surname, 
				firstname: employee.othername,
				// county: employee.county, 
				country: employee.country,
				city: employee.city,
				dob: employee.dob,
				start_date: employee.start_date,
				end_date: employee.end_date,
				bank_details: employee.bank_details,
				other_address:employee.address2,
				other_email:employee.email2,
				other_mobile:employee.phone2,
				post:employee.post.id
			}

			$("body").LoadingOverlay("show")

			employeeService.update(employee_data).then(function(data){

				console.log(data)

				setTimeout(function(){

					$("body").LoadingOverlay("hide")

				}, 500)
			})
		}
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

		$state.go("employee.details", {id:row.id})
	}

	$scope.customLoader = function(table, options, builder){

		employeeService.getEmployees(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		});	
	}
}]);