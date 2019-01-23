app.controller("usersController", ['$scope',
									'$http',
									'userService',
									'roleService', 
									function($scope, $http, userService, roleService){

	$scope.addNew = function(){

		$scope.id = ""
		$scope.username = ""
		$scope.role = null
		$scope.password = ""
		$scope.lpassword = ""
		$scope.cpassword = ""

		roleService.getList().then(function(data){

			$scope.roles = data
			$scope.role = null
		})
	}

	$scope.submit = function(){

		var user  = {

			username:$scope.username,
			role:$scope.role,
			password:$scope.password,
			lpassword:$scope.lpassword,
			cpassword:$scope.cpassword
		}

		var meta = {

			username:{

				name:"Username",
				format:"alphaOrNumericOrBoth",
				required:true
			},
			password:{

				name:"New Password",
				required:true
			},
			cpassword:{

				name:"Confirm Password",
				required:true
			},
			role:{

				name:"Role",
				required:true
			}
		}

		if(!!$scope.id)
			meta = $.extend({}, {

				lpassword:{

					name:"Current Password",
					required:true
				}
				
			}, meta)

		var validator = validate(user, meta)

		// console.log(meta)

		if(validator.isValid()){

			user = validator.getSanitized()

			// console.log(user)

			if(!user.cpassword.equalTo(user.password)){

				$.growl({

					title: "User", 
					message: "New Password and Confirm Password do not match!"
				})
			}
			else{

				var userSrv;
				if(!!$scope.id){

					user.id = $scope.id
					userSrv = userService.update(user)
				}
				else userSrv = userService.add(user)

				$("body").LoadingOverlay("show")

				userSrv.then(function(data){

					if(data.message){

						$.growl({

							title: "User",
							message: data.message
						})

						$("body").LoadingOverlay("hide")
					}
					else {

						setTimeout(function(){

							$("body").LoadingOverlay("hide")
							$("#user-tbl").trigger("refresh")

						}, 400)
					}	

					$scope.dialogUserOpen = false;
				})
			}

		}
		else validator.flushMessage("User")
	}

	$scope.cancelMsgHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.cancelResetPassHandle = function(){

		$scope.dialogResetPassOpen = false;
	}
	
	$scope.cancelUserHandle = function(){

		$scope.dialogUserOpen = false;
	}

	$scope.okHandle = function(){

		$scope.dialogResetPassOpen = false
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogUserOpen = true;
				
				$scope.addNew()
			})		
		})

		var btnReset = $(document.createElement("BUTTON")).html("Reset")
		btnReset.click(function(){
			
			$scope.$apply(function(){

				if($("tr.selected").length>0){

					$scope.message = "Are you sure you want to continue with this action?"
					$scope.dialogResetPassOpen = true
				}
				else{

					$scope.infomessage = "Please select a row in the grid."
					$scope.dialogMsgOpen = true
				}
			})
		})

		return [

			[btnAdd, btnReset]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		userService.get(row.id).then(function(data){

			$scope.dialogUserOpen = true;

			$scope.id = data.id
			$scope.username = data.username
			$scope.lpassword = ""
			$scope.cpassword = ""
			$scope.password = ""
			$scope.roles = data.roles

			for(idx in data.roles)
				if(data.roles[idx].id == data.role)
					$scope.role = data.roles[idx];
		})
	}

	$scope.customLoader = function(table, options, builder){

		userService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			builder(table, data, options);
		})
	}
}]);