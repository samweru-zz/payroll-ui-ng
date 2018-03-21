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
				email:data.email,
				mobile:data.mobile,
				address:data.address,
				marital_status:employeeService.getMaritalStatus(data.marital_status),
				gender:employeeService.getGenders(data.gender),
				surname:data.surname,
				othernames:data.othernames,
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
				email: employee.email,
				mobile: employee.mobile, 
				status: employee.active,
				address: employee.address,
				marital_status: employee.marital_status,
				gender: employee.gender.name,
				surname: employee.surname, 
				othernames: employee.othernames,
				// county: employee.county, 
				country: employee.country,
				city: employee.city,
				dob: employee.dob,
				start_date: employee.start_date,
				end_date: employee.end_date,
				bank_details: employee.bank_details,
				other_address:employee.other_address,
				other_email:employee.other_email,
				other_mobile:employee.other_mobile,
				post:employee.post.id
			}

			var validator = validate(employee_data, {

				idno:{

					name: "IDNo",
					format:"number",
					len:8,
					required:true
				},
				othernames:{

					name:"Other Names",
					format:"alpha",
					required:true
				},
				surname:{

					name:"Surname",
					format:"alpha",
					required:true
				},
				nssf_no:{

					name:"NSSF No.",
					format:"number",
					len:9,
					required:true
				},
				nhif_no:{

					name:"NHIF No.",
					format:"number",
					len:7,
					required:true
				},
				pin:{

					name:"PIN",
					format:"alphaNumericOnly",
					len:12,
					required:true					
				},
				email:{

					name:"Email",
					format:"email",
					required:true
				},
				mobile:{

					name:"Mobile Number",
					required:true
				},
				marital_status:{

					name:"Marital Status",
					required:true
				},
				gender:{

					name:"Gender",
					required:true
				},
				dob:{

					name:"Date of Birth",
					required:true
				},
				start_date:{

					name:"Start Date",
					required:true
				},
				end_date:{

					name:"End Date",
					required:true
				},
				post:{

					name:"Post",
					required:true
				},
				bank_details:{

					name:"Bank Details",
					required:true
				}
			})

			// console.log(validator.isValid())

			console.log(validator.getState())

			if(validator.isValid()){

				$("body").LoadingOverlay("show")

				employeeService.update(employee_data).then(function(data){

					// console.log(data)

					setTimeout(function(){

						$("body").LoadingOverlay("hide")

					}, 500)
				})
			}
			else validator.flushMessage("Employee")
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