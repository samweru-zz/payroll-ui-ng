app.controller("loginController", ['$scope',
									'$http', 
									'userService',
									function($scope, $http, userService){

	$scope.username = "sa"
	$scope.password = "p@55w0rd"

	$scope.okHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.submit = function(){

		userService.doAuth($scope.username, $scope.password).then(function(data){

			if(data.isLoggedIn){

			 	$scope.dialogLoginOpen = false;
			}
			else{

			 	$scope.message = "Invalid Credentials!";
			 	$scope.dialogMsgOpen = true;
			}
		})
	}	
}]);