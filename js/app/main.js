var app = angular.module("myApp", ["ui.router", "ngMockE2E"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('benefits', {

            url:'/benefits',
            templateUrl : "benefits.html",	
	        controller: "benefitsController"
        })
        .state('posts', {

            url:'/posts',
            templateUrl : "posts.html",	
	        controller: "postsController"
        })
    	.state('roles', {

            url:'/roles',
            templateUrl : "roles.html",	
	        controller: "rolesController"
        })
        .state('depts', {

            url:'/depts',
            templateUrl : "depts.html",	
	        controller: "deptsController"
        })
        .state('users', {

            url:'/users',
            templateUrl : "users.html",	
	        controller: "usersController"
        })
        .state('period', {

            url:'/period',
            templateUrl : "period.html",	
	        controller: "periodController"
        })
        .state('employee-edit', {

            url: '/employee/:id',
            templateUrl : "employee-edit.html",
	        controller: "employeeController"
        })
        .state('employee-add', {

            url: '/employee/add',
            templateUrl : "employee-add.html",
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
        .state('rates', {

            url: '/rates',
            templateUrl: "rates.html"
        })

        $urlRouterProvider.otherwise('/');
}])
