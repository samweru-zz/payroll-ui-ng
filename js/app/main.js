var app = angular.module("myApp", ["ui.router", "ngMockE2E", "ngCookies"]);

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
        .state('employee', {

            url: '/employee/:id',
            templateUrl : "employee-edit.html"
        })
        .state('employee.details', {

            url: '/details',
            views:{

                "employee-details@employee":{

                    templateUrl : "employee.html",
                    controller: "employeeController"
                }
            } 
        })
        .state('employee.payroll', {

            url:'/payroll',
            views:{

                "employee-details@employee":{

                    templateUrl : "payroll-details.html",
                    controller: "payrollController"
                }
            } 
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
        .state('rates.nhif', {

            url: '/nhif',
            views:{
                'rate-details@rates':{
                    
                    templateUrl: "nhif.html",
                    controller: "nhifController"
                }
            }
        })
        .state('rates.paye', {

            url: '/paye',
            views:{
                'rate-details@rates':{
                    
                    templateUrl: "paye.html",
                    controller: "payeController"
                }
            }
        })
        .state('rates.taxrelief', {

            url: '/taxrelief',
            views:{
                'rate-details@rates':{
                    
                    templateUrl: "relief.html",
                    controller: "taxReliefController"
                }
            }
        })

        $urlRouterProvider.otherwise('/');
}])


$.LoadingOverlaySetup({

    color:"rgba(0, 0, 0, 0.4)",
    image:"img/loader.gif",
    maxSize:"30px",
    minSize:"20px",
    resizeInterval:0,
    size:"50%"
});