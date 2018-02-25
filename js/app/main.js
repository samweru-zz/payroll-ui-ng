var app = angular.module("myApp", ["ui.router", "ngMockE2E"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    	// .state('nhif', {

     //        url:'/nhif',
     //        templateUrl : "nhif.html",	
	    //     controller: "nhifController"
     //    })
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
            templateUrl: "rates.html"//,
	    	// controller: "loginController"
        })
      //   .state('paye', {

      //       url: '/paye',
      //       templateUrl: "paye.html",
	    	// controller: "payeController"
      //   })

        $urlRouterProvider.otherwise('/');
}])
.run(['$httpBackend', "$state", "$location", function ($httpBackend, $state, $location){

		$httpBackend.whenPOST('/data/nhif').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _nhif = nhif().get()

		    for(idx in _nhif){

				delete _nhif[idx].___id;
				delete _nhif[idx].___s;
			}

			return [200, {rows:_nhif, count:nhif().count()}, {}];
		});

		$httpBackend.whenPOST('/data/paye').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _paye = paye().start(start_from).limit(pager.rows).get()

		    for(idx in _paye){

				delete _paye[idx].___id;
				delete _paye[idx].___s;
			}

			return [200, {rows:_paye, count:paye().count()}, {}];
		});

     	$httpBackend.whenGET(/(\.html)$/).passThrough();

     	$httpBackend.whenPOST('/data/period').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _periods = period().get()

		    var __periods = [];

		    for(idx in _periods){

		    	__periods.push({

		    		"start":_periods[idx].start,
		    		"end":_periods[idx].end,
		    		"status":_periods[idx].status,
		    		"active":_periods[idx].active?"Yes":"No"
		    	})
		    }

		    console.log(__periods);

			return [200, {rows:__periods, count:period().count()}, {}];
		}); 

     	$httpBackend.whenPOST('/data/users').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _users = users().get()

		    var __users = [];

		    for(idx in _users){

		    	var role = roles({id:_users[idx].role}).first()

		    	__users.push({

		    		username: _users[idx].username,
		    		role_id:  role.id,
		    		role_name: role.name
		    	})
		    }

			return [200, {rows:__users, count:users().count()}, {}];
		});  

     	$httpBackend.whenPOST('/data/login').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    data = JSON.parse(data)

		    // console.log(data)

		    var _user = {}
		    if(!$.isEmptyObject(data))
		    	_user = users(data).first();

		    var response = {

		    	isLoggedIn:false
		    };

		    // console.log(_user)

		    if(!$.isEmptyObject(_user)){

		    	response = {

		    		isLoggedIn:true
		    	}
		    }

			return [200, response, {}];
		});

		$httpBackend.whenPOST('/data/role-list').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _roles = roles().get()

		    for(idx in _roles){

				delete _roles[idx].___id;
				delete _roles[idx].___s;
				// delete _roles[idx].descr;
			}

			// console.log(_roles)

			return [200, _roles, {}];
		});

		$httpBackend.whenPOST('/data/roles').respond(function(method, url, data, headers){

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

		///\/contacts\/(\d+)/,
		$httpBackend.whenPOST(/data\/employee\/(\d+)/, {}, {}, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Received these data:', method, url, data, headers, params);

		    // var re = /.*\/friends\/(\w+)/;
      		// var friendId = parseInt(url.replace(re, '$1'), 10);



		 //    for(idx in _employees){

			// 	__employees.push({

			// 		"id":_employees[idx].id,
			// 		"idno":_employees[idx].idno,
			// 		"firstname":_employees[idx].firstname,
			// 		"lastname":_employees[idx].lastname,
			// 		"email":_employees[idx].email,
			// 		"county":_employees[idx].county,
			// 	})
			// }

			// return [200, {rows:__employees, count:employees().count()}, {}];

			return [200, {}, {}]
		});


		$httpBackend.whenPOST('/data/employees').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _employees = employees().start(start_from).limit(pager.rows).get()

		    var __employees = [];

		    for(idx in _employees){

				__employees.push({

					"id":_employees[idx].id,
					"idno":_employees[idx].idno,
					"firstname":_employees[idx].firstname,
					"lastname":_employees[idx].lastname,
					"email":_employees[idx].email,
					"county":_employees[idx].county,
				})
			}

			return [200, {rows:__employees, count:employees().count()}, {}];
		});

		$httpBackend.whenPOST('/data/depts').respond(function(method, url, data, headers){

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

		$httpBackend.whenPOST('/data/dept-list').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _depts = depts().get()

		    for(idx in _depts){

				delete _depts[idx].___id;
				delete _depts[idx].___s;
			}

			return [200, _depts, {}];
		});

		$httpBackend.whenPOST('/data/post-list').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _posts = posts().get()

		    for(idx in _posts){

				delete _posts[idx].___id;
				delete _posts[idx].___s;
			}

			return [200, _posts, {}];
		});

		$httpBackend.whenPOST('/data/posts').respond(function(method, url, data, headers){

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

		$httpBackend.whenPOST('/data/benefits').respond(function(method, url, data, headers){

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