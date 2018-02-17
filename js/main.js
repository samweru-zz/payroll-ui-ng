var app = angular.module("myApp", ["ngRoute", "ngMockE2E"]);

app.config(function($routeProvider){	

    $routeProvider
	    .when("/user", {

	        templateUrl : "user.html",	
	        controller: "userController"
	    })
	    .when("/employee/:id", {

	        templateUrl : "employee.html",
	        controller: "employeeController"
	    })
	    .when("/employees", {

	        template:"<table id='employee-tbl'></table>",
	        controller: "employeesController"
	    })
	    .when("/", {

	    	template: "",
	    	controller: "loginController"
	    })
	    .otherwise({

	    	redirectTo:"/"
	    })
})
.run(['$httpBackend', function ($httpBackend){

     	$httpBackend.whenGET(/(\.html)$/).passThrough();  

     	$httpBackend.whenPOST('/data/login.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

			return [200, {"username":"sa", "password":"p@55w0rd"}, {}];
		});

		$httpBackend.whenPOST('/data/roles.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _roles = roles().get()

		    for(idx in _roles){

				delete _roles[idx].___id;
				delete _roles[idx].___s;
			}

			return [200, _roles, {}];
		});

		$httpBackend.whenPOST('/data/employees.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _employees = employees().start(start_from).limit(pager.rows).get()

		    for(idx in _employees){

				delete _employees[idx].___id;
				delete _employees[idx].___s;
			}

			return [200, {rows:_employees, count:employees().count()}, {}];
		});
    }
]);

app.controller("userController", ['$scope','$http','$httpBackend', function($scope, $http, $httpBackend){

	$http.post("/data/roles.json").then( function(response){

		var _roles = response.data;

		var roles_data = {};
		for(idx in _roles)
			roles_data[_roles[idx]["id"]] = _roles[idx]["name"];

	 	$scope.roles = roles_data;
	});	
}]);

app.controller("employeeController", ['$scope','$http', function($scope, $http){

	// $http.get("data/employee.json").then( function(response){

	// 	var employee = response.data;

	//  	$scope.genders = employee.genders;
	//  	$scope.maritalStatus = employee.maritalStatus;
	// });	
}]);

app.controller("employeesController", ['$scope', '$http', '$httpBackend', "$location", function($scope, $http, $httpBackend, $location){

	// var btnEdit = $(document.createElement("BUTTON")).html("Edit")
	// btnEdit.click(function(){

	// 	var row = $("#employee-tbl").getSelectedRow();

	// 	if(Object.keys(row).length > 1)
	// 		$scope.$apply(function() {
	// 		  $location.path("/employee/".concat(row.id));
	// 		});
			
	// })

	$("#employee-tbl")
		.simplrGrid({

			url:"data/employees.json",
			method:"POST",
			title:"Employees",
			usePager:true,
			singleSelect:true,
			fixLeftColumn:true,
			fixHeader:true,
			resizeColumns:true,
			columnHide:[

				"id"
			],
			toolbars:[

				// [btnEdit]	
			],
			css:{

				capsuleWidth:"100%",
				gridHeight:"400px",
				gridWidth:"90%"
			},
			pager:{

				page:1,
				rows:10,
				list:[10,20]
			},
			dblClick:function(){

				var row = $(this).getRow();

				$scope.$apply(function(){

					$location.path("/employee/".concat(row.id));
				});
			},
			customLoader:function(table, options, builder){

				$http.post("/data/employees.json", {

				    page:options.pager.page,
				    rows:options.pager.rows
				})
				.then( function(response){

					//total-number-of-rows/rows-per-page
					options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

					// console.log(response);

					builder(table, response.data, options);
				});	
			}
		})
}]);

app.controller("loginController", ['$scope','$http', '$httpBackend', '$templateCache', function($scope, $http, $httpBackend, $templateCache){

	$("div.tree").css({display:"none"});

	var login = $($templateCache.get("login.html"));

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

			$http.post("/data/login.json").then(function(response){

				console.log(response);

			 	if(txtUsername.val() != response.data.username || 
			 		txtPassword.val() != response.data.password){

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