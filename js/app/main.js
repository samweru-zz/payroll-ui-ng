var app = angular.module("myApp", ["ui.router", "ngMockE2E"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('benefits', {

            url:'/benefits',
            templateUrl : "benefits.html",	
	        controller: "benefitsController"
        })
    	.state('post-edit', {

            url:'/post',
            templateUrl : "post.html",	
	        controller: "postController"
        })
        .state('post-add', {

            url:'/post',
            templateUrl : "post.html",	
	        controller: "postController"
        })
        .state('posts', {

            url:'/posts',
            templateUrl : "posts.html",	
	        controller: "postsController"
        })
        .state('post', {

            url:'/post',
            templateUrl : "post.html",	
	        controller: "postController"
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
        .state('user', {

            url:'/user',
            templateUrl : "user.html",	
	        controller: "userController"
        })
        .state('employee-edit', {

            url: '/employee/:id',
            templateUrl : "employee.html",
	        controller: "employeeController"
        })
        .state('employee-add', {

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
.run(['$httpBackend', "$state", "$location", function ($httpBackend, $state, $location){

     	$httpBackend.whenGET(/(\.html)$/).passThrough();  

     	$httpBackend.whenPOST('/data/login.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

			return [200, {"username":"sa", "password":"p@55w0rd"}, {}];
		});

		$httpBackend.whenPOST('/data/role-list.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _roles = roles().get()

		    for(idx in _roles){

				delete _roles[idx].___id;
				delete _roles[idx].___s;
				// delete _roles[idx].descr;
			}

			console.log(_roles)

			return [200, _roles, {}];
		});

		$httpBackend.whenPOST('/data/roles.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _roles = roles().start(start_from).limit(pager.rows).get()

		    for(idx in _roles){

				delete _roles[idx].___id;
				delete _roles[idx].___s;
			}

			return [200, {rows:_roles, count:roles().count()}, {}];
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

		$httpBackend.whenPOST('/data/depts.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _depts = depts().start(start_from).limit(pager.rows).get()

		    for(idx in _depts){

				delete _depts[idx].___id;
				delete _depts[idx].___s;
			}

			return [200, {rows:_depts, count:depts().count()}, {}];
		});

		$httpBackend.whenPOST('/data/post-list.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _posts = posts().get()

		    for(idx in _posts){

				delete _posts[idx].___id;
				delete _posts[idx].___s;
			}

			return [200, _posts, {}];
		});

		$httpBackend.whenPOST('/data/posts.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _posts = posts().start(start_from).limit(pager.rows).get()

		    var __posts = [];

		    for(idx in _posts){

		    	var dept = depts({id:_posts[idx].id}).first();

				__posts.push({

					dept_name: dept.descr,
					dept_id: dept.id,
					name: _posts[idx].name,
					descr: _posts[idx].descr
				})
			}

			return [200, {rows:__posts, count:posts().count()}, {}];
		});

		$httpBackend.whenPOST('/data/benefits.json').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _benefits = benefits().start(start_from).limit(pager.rows).get()

		    for(idx in _benefits){

				delete _benefits[idx].___id;
				delete _benefits[idx].___s;

				// _benefits[idx].

				// _benefits[idx].dept = depts({id:_benefits[idx].id}).get()[0].descr
			}

			// console.log(_benefits)

			return [200, {rows:_benefits, count:benefits().count()}, {}];
		});
    }
]);