app.controller("loginController", ['$scope',
									'$http', 
									'userService',
									function($scope, $http, userService){

	$scope.login = {

		username:"sa",
		password:"p@55w0rd"
	}

	$scope.okHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.submit = function(){

		$("body").LoadingOverlay("show")

		setTimeout(function(){

			$("body").LoadingOverlay("hide")

			userService.doAuth($scope.login.username, $scope.login.password).then(function(data){

				if(data.isLoggedIn){

				 	$scope.dialogLoginOpen = false;
				}
				else{

				 	$scope.message = "Invalid Credentials!";
				 	$scope.dialogMsgOpen = true;
				}
			})

		}, 1000)
	}	
}]);