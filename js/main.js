var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider){

    $routeProvider
	    .when("/user", {

	        templateUrl : "tpl/user.html",
	        controller: "userController"
	    })
	    .when("/employee", {

	        templateUrl : "tpl/employee.html",
	        controller: "employeeController"
	    })
	    .when("/employees", {

	        // templateUrl : "tpl/employees.html",
	        template:"",
	        controller: "employeesController"
	    })
	    .when("/", {

	    	template:"<b></b>",
	    	controller: "loginController"
	    })
	    .otherwise({

	    	redirectTo:"/"
	    })
});

app.controller("userController", ['$scope','$http', function($scope, $http){

	var url = "data/roles.json";

	$http.get(url).then( function(response){

	 	$scope.roles = response.data;
	});	
}]);

app.controller("employeeController", ['$scope','$http', function($scope, $http){

	var url = "data/employee.json";

	$http.get(url).then( function(response){

		var employee = response.data;

	 	$scope.genders = employee.genders;
	 	$scope.maritalStatus = employee.maritalStatus;
	});	
}]);

app.controller("employeesController", ['$scope', '$http', function($scope, $http){

	$http.get("/data/employees.json").then(function(response){

		// console.log(response.data);


		$(document.createElement("TABLE"))
		.attr("id", "employees-tbl")
		.appendTo("BODY")
		.simplrGrid({

			// url:"/server/fetch.all.php",
			// method:"POST",
			title:"Sample Grid",
			// usePager:true,
			// data:{},
			data:response.data, 
			// singleSelect:true,
			freezeHeader:false,
			freezeLeftColumn:false,
			resizeColumns:false,
			columnHide:[

				"id"
			],
			// toolbars:[

				// [btnAdd, btnSel]	
			// ],
			css:{

				// width:500,
				height:500
			},
			// pager:{

			// 	page:1,
			// 	rows:10//,
			// 	// list:[10,20]
			// },
			onDblClick:function(row){

				console.log(row);
			}
		})
		.fixLeftColumn()
		.fixHeader()
		.resizeColumns();
	});
}]);

// app.controller("vm", function($scope, $element) {

//   vm = $scope;
  
//   //APPEND for DEMO purposes
//   vm.html = '<script>alert("Hello John!");</script><p>Loaded</p>';
//   $element.append(vm.html);
  
//   //FIND script and eval 
//   var js = $element.find("script")[0].innerHTML;
//   eval(js);
  
// });

app.controller("loginController", ['$scope','$http', function($scope, $http){

	$("div.tree").css({display:"none"});

	var login = $($("script[id='login.html']").html());

	login.dialog({

		draggable:false,
	    resizable: false,
	    height: "auto",
	    modal: true,
	    open: function(event, ui) {

	        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
	    }
	});

	login.find("button[id=login]").click(function(){

		var txtUsername = login.find("input[name=username]");
		var txtPassword = login.find("input[name=password]");

		if(txtUsername.val() == undefined   || 
			txtUsername.val() == ""			||
			txtPassword.val() == undefined 	||
			txtPassword.val() == ""){

				alert("Username and/or Password cannot be empty!");
		}
		else{

			var url = "data/login.json";

			$http.post(url).then(function(response){

			 	if(txtUsername.val() != response.data.username || 
			 		txtPassword.val() != response.data.password){

			 		// console.log(txtUsername.val() + " " + response.username + "---" + 
			 					// txtPassword.val() + " " + response.password);

			 		alert("Username and/or Password is wrong!");
				}
				else{

					login.dialog("close");

					$("div.tree").css({display:"block"});
				}
			});	
		}
	});
}]);