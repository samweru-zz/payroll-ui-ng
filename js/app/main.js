var app = angular.module("myApp", ["ui.router", "ngMockE2E"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('user', {

            url:'/user',
            templateUrl : "user.html",	
	        controller: "userController"
        })
        .state('employee.edit', {

            url: '/employee/:id',
            templateUrl : "employee.html",
	        controller: "employeeController"
        })
        .state('employee.add', {

            url: '/employee/add',
            templateUrl : "employee.html",
	        controller: "employeeController"
        })
        .state('employees', {

            url: '/employees',
            templateUrl:"employees.html",
	        controller: "employeesController"
        })
        .state('login', {

            url: '/',
            templateUrl: "login.html",
	    	controller: "loginController"
        })

        $urlRouterProvider.otherwise('/');
}])
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