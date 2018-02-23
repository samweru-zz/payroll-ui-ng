app.controller("loginController", ['$scope','$http', '$httpBackend', function($scope, $http, $httpBackend){

	$scope.okHandle = function(){

		$scope.dialogMsgOpen = false;
	}

	$scope.submit = function(){

		$http.post("/data/login.json",{

			username:$scope.username,
			password:$scope.password
		})
		.then(function(response){

			// console.log(response);

			if(response.data.isLoggedIn){

			 	$scope.dialogLoginOpen = false;
			}
			else{

			 	$scope.message = "Invalid Credentials!";
			 	$scope.dialogMsgOpen = true;
			}
		});
	}	
}]);