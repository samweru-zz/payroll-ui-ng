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
	    .when("/employee/add", {

	        templateUrl : "employee.html",
	        controller: "employeeController"
	    })
	    .when("/employees", {

	        templateUrl:"employees.html",
	        controller: "employeesController"
	    })
	    .when("/", {

	    	templateUrl: "login.html",
	    	controller: "loginController"
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