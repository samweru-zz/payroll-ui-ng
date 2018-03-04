app.run(['$httpBackend', function ($httpBackend){

		$httpBackend.whenGET(/(\.html)$/).passThrough();

		$httpBackend.whenPOST(/\/data\/benefit\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

			console.log('Received these data:', method, url, data, headers, params);

			var benefit = benefits({id:parseInt(params.id)}).first()

			delete benefit.___s
			delete benefit.___id

			return [200, benefit, {}];
		})

		$httpBackend.whenPOST(/\/data\/employee\/(\d+)\/benefits/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Received these data:', method, url, data, headers, params);

      		var _benefits = []

      		$.each(employee_benefits({employee:parseInt(params.id)}).get(), function(idx, empBen){

      			var benefit = benefits({id:empBen.benefit}).first()
      			delete benefit.___id
				delete benefit.___s

				var amount = benefit.amount;
				if(benefit.percentage)
					amount = amount + "%"

				var type = "Benefit"
				if(benefit.deduct)
					type = "Deduction"

				var taxable = "No"
				if(benefit.taxable)
					taxable = "Yes"

      			_benefits.push({

      				"id":benefit.id,
      				"name":benefit.name,
      				"amount":amount,
      				"type":type,
      				"taxable":taxable
      			})
      		})

			return [200, {rows:_benefits, count:_benefits.length}, {}];
		});

		$httpBackend.whenPOST(/\/data\/employee\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Received these data:', method, url, data, headers, params);

      		var _employee = employees({id:parseInt(params.id)}).first()

			return [200, _employee, {}];
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

		$httpBackend.whenPOST('/data/taxrelief').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _relief = relief().get()

		    for(idx in _relief){

				delete _relief[idx].___id;
				delete _relief[idx].___s;
			}

			return [200, {rows:_relief, count:relief().count()}, {}];
		});

		$httpBackend.whenPOST('/data/nhif/rates').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _nhif = nhif().get()

		    for(idx in _nhif){

				delete _nhif[idx].___id;
				delete _nhif[idx].___s;
			}

			return [200, {rows:_nhif, count:nhif().count()}, {}];
		});

		$httpBackend.whenPOST('/data/paye/rates').respond(function(method, url, data, headers){

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

     	$httpBackend.whenPOST('/data/periods').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _periods = period().get()

		    for(idx in _periods){

		    	delete _periods[idx].___id;
				delete _periods[idx].___s;
		    }

			return [200, {rows:_periods, count:period().count()}, {}];
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

		    var _user = {}
		    if(!$.isEmptyObject(data))
		    	_user = users(data).first();

		    var response = {

		    	isLoggedIn:false
		    };

		    if(!$.isEmptyObject(_user))
		    	response.isLoggedIn = true

			return [200, response, {}];
		});

		$httpBackend.whenPOST('/data/role-list').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _roles = roles().get()

		    for(idx in _roles){

				delete _roles[idx].___id;
				delete _roles[idx].___s;
			}

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
			}

			return [200, {rows:_benefits, count:benefits().count()}, {}];
		});

		$httpBackend.whenPOST('/data/benefits-list').respond(function(method, url, data, headers){

		    console.log('Received these data:', method, url, data, headers);

		    var _benefits = benefits().get()

		    var __benefits = []

		    for(idx in _benefits){

				__benefits.push({

					"id":_benefits[idx].id,
					"name":_benefits[idx].name
				})
			}

			return [200, __benefits, {}];
		});
    }
]);