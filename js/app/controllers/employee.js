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

			$scope.id = $stateParams.id
			$scope.idno = data.idno
			$scope.nssf = data.nssf_no
			$scope.nhif = data.nhif_no
			$scope.pin = data.pin
			$scope.email = data.email
			$scope.mobile = data.mobile
			$scope.address = data.address
			$scope.marital_status = employeeService.getMaritalStatus(data.marital_status)
			$scope.gender = employeeService.getGenders(data.gender)
			$scope.surname = data.surname
			$scope.othernames = data.othernames
			// $scope.county = data.county
			$scope.country = data.country
			$scope.city = data.city
			$scope.dob = new Date(data.dob)
			$scope.start_date =  new Date(data.start_date)
			$scope.end_date = new Date(data.end_date)
			$scope.bank_details = data.bank_details
			$scope.other_address = data.other_address
			$scope.other_email = data.other_email
			$scope.other_mobile = data.other_mobile
			$scope.active = data.status

			$scope.post = $scope.posts.find(function(e){

				return data.post == e.id
			})
		})

		$scope.addNew = function(){

			$scope.id = ""
			$scope.idno = ""
			$scope.nssf = ""
			$scope.nhif = ""
			$scope.pin = ""
			$scope.email = ""
			$scope.mobile = ""
			$scope.address = ""
			$scope.marital_status = null
			$scope.gender = null
			$scope.surname = ""
			$scope.othernames = ""
			// $scope.county = ""
			$scope.country = ""
			$scope.city = ""
			$scope.dob = ""
			$scope.start_date = ""
			$scope.end_date = ""
			$scope.bank_details = ""
			$scope.other_address = ""
			$scope.other_email = ""
			$scope.other_mobile = ""
			$scope.active = ""

			$scope.post = null
		}

		$scope.submit = function(){

			// console.log($scope.gender)

			if(!$scope.id)
			 $scope.addNew()

			var marital_status = isObject($scope.marital_status)?$scope.marital_status.name:$scope.marital_status
			var gender = isObject($scope.gender)?$scope.gender.name:$scope.gender
			var post = isObject($scope.post)?$scope.post.id:$scope.post

			var employee_ = {

				idno: $scope.idno,
				nssf_no: $scope.nssf,
				nhif_no: $scope.nhif,
				pin: $scope.pin,
				email: $scope.email,
				mobile: $scope.mobile, 
				status: $scope.active,
				address: $scope.address,
				marital_status: marital_status,
				gender: gender,
				surname: $scope.surname, 
				othernames: $scope.othernames,
				// county: $scope.county, 
				country: $scope.country,
				city: $scope.city,
				dob: $scope.dob,
				start_date: $scope.start_date,
				end_date: $scope.end_date,
				bank_details: $scope.bank_details,
				other_address:$scope.other_address,
				other_email:$scope.other_email,
				other_mobile:$scope.other_mobile,
				post:post
			}

			var validator = validate(employee_, {

				idno:{

					name: "IDNo",
					format:"number",
					len:7,
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

			// console.log(validator.getState())

			if(validator.isValid()){

				employee_ = $.extend(employee_, validator.getSanitized())

				console.log(employee_)

				if(!!$scope.id){

					employee_.id = $scope.id
					empSrv = employeeService.update(employee_)
				}
				else empSrv = employeeService.add(employee_)

				$("body").LoadingOverlay("show")

				empSrv.then(function(data){

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