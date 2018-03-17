app.run(['$httpBackend', function ($httpBackend){

		$httpBackend.whenPOST('/role/list').respond(function(method, url, data, headers){

		    console.log('Role List:', method, url, data, headers);

		    var _roles = roles().get()

		    var __roles = []

		    for(idx in _roles){

		    	__roles.push({

		    		id:_roles[idx].id,
		    		name:_roles[idx].name
		    	})
			}

			return [200, __roles, {}];
		});

		$httpBackend.whenPOST('/roles').respond(function(method, url, data, headers){

		    console.log('Roles:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _roles = roles().start(start_from).limit(pager.rows).get()

		    var __roles = []

		    for(idx in _roles){

		    	__roles.push({

		    		id:_roles[idx].id,
		    		descr:_roles[idx].descr,
		    		name:_roles[idx].name
		    	})
			}

			return [200, {rows:__roles, count:roles().count()}, {}];
		});

		$httpBackend.whenPOST(/\/role\/(\d+)/, undefined, undefined, ["id"]).respond(function(method, url, data, headers, params){

			console.log('Role:', method, url, data, headers, params);

			var roleId = parseInt(params.id)

			var _role = roles({id:roleId}).first()

			var __role = {

				id:_role.id,
				name:_role.name,
				descr:_role.descr
			}

			return [200, __role, {}]
		})

		$httpBackend.whenPOST("/role/add").respond(function(method, url, data, headers, params){

			console.log('Role Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				var role = roles.insert({

					id:roles().count()+1,
					name:data.name,
					descr:data.descr
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})

		$httpBackend.whenPOST("/role/update").respond(function(method, url, data, headers, params){

			console.log('Role Update:', method, url, data, headers, params);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var role = roles({id:data.id}).update(data)

				success = !!role.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		})


		$httpBackend.whenPOST("/add/employee/pay").respond(function(method, url, data, headers, params){

			console.log('Employee Pay Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				var empPay = employee_pay.insert({

					id:employee_pay().count()+1,
					employee:data.employee,
					salary:data.salary,
					insurance_relief:data.insurance_relief
				})

				success = true
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}];
		})

		$httpBackend.whenPOST("/update/employee/pay").respond(function(method, url, data, headers, params){

			console.log('Employee Pay Update:', method, url, data, headers, params);

			data = JSON.parse(data)
			data.id = parseInt(data.id)

			var success;

			try{

				employee_pay({id:parseInt(data.id)}).update(data)

				success = true
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}];
		})

		$httpBackend.whenPOST(/\/employee\/(\d+)\/payroll/, undefined, undefined, ["id"]).respond(function(method, url, data, headers, params){

			var employee = employees({id:parseInt(params.id)}).first()
			var pay_details = employee_pay({employee:parseInt(params.id)}).first()
			
			var _benefits = [] 
			$.each(benefits().get(), function(idx, benefit){

				_benefits.push({

					"id":benefit.id,
					"name":benefit.name
				})
			})

			return [200, {

				employee:{

					firstname:employee.firstname,
					lastname:employee.lastname
				},
				pay_details:pay_details,
				benefits:_benefits,

			}, {}]
		})

		$httpBackend.whenDELETE(/\/employee\/(\d+)\/remove\/benefit\/(\d+)/, undefined, ["employee","benefit"]).respond(function(method, url, data, headers, params){

			console.log('Employee Add Benefit:', method, url, data, headers, params);

			var success;

			try{

				var deleted = employee_benefits({

					employee:parseInt(params.employee),
					benefit:parseInt(params.benefit)
				})
				.remove()

				success = true
			}
			catch(err){

				success = false
			}

			return [200, {"success": success}, {}];
		})

		$httpBackend.whenPOST(/\/employee\/(\d+)\/add\/benefit\/(\d+)/, undefined, undefined, ["employee","benefit"]).respond(function(method, url, data, headers, params){

			console.log('Employee Add Benefit:', method, url, data, headers, params);

			var success;

			try{

				var employee_benefit = employee_benefits.insert({

					id:employee_benefits().count()+1,
					employee:parseInt(params.employee),
					benefit:parseInt(params.benefit)
				})

				success = true
			}
			catch(err){

				success = false
			}

			return [200, {"success": success}, {}];
		})

		$httpBackend.whenPOST("/employee/update").respond(function(method, url, data, headers, params){

			console.log('Employee Update:', method, url, data, headers, params);

			data = JSON.parse(data)
			data.id = parseInt(data.id)

			var success;

			try{

				employees({id:data.id}).update(data)

				success = true
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}];
		})

		$httpBackend.whenPOST(/\/employee\/(\d+)\/benefits/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Employee Benefits:', method, url, data, headers, params);

      		var _benefits = []

      		$.each(employee_benefits({employee:parseInt(params.id)}).get(), function(idx, empBen){

      			var benefit = benefits({id:empBen.benefit}).first()

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

			return [200, {rows:_benefits.reverse(), count:_benefits.length}, {}];
		});


		$httpBackend.whenPOST(/\/employee\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Employee:', method, url, data, headers, params);

      		var _employee = employees({id:parseInt(params.id)}).first()

			return [200, _employee, {}];
		});

		$httpBackend.whenPOST('/employees').respond(function(method, url, data, headers){

		    console.log('Employees:', method, url, data, headers);

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

			return [200, {rows:__employees.reverse(), count:employees().count()}, {}];
		});

		$httpBackend.whenPOST('/taxrelief/update').respond(function(method, url, data, headers){

			console.log('Tax Relief Update:', method, url, data, headers);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var taxrelief = relief({id:data.id}).update(data)

				success = !!taxrelief.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST("/taxrelief/add").respond(function(method, url, data, headers, params){

			console.log('Tex Relief Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				relief.insert({

					id:relief().count()+1,
					name:data.name,
					amt:data.amt,
					active:data.active
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})

		$httpBackend.whenPOST('/taxrelief').respond(function(method, url, data, headers){

		    console.log('Tax Relief:', method, url, data, headers);

		    var _relief = relief().get()

		    var __relief = []

		    for(idx in _relief){

		    	__relief.push({

		    		id:_relief[idx].id,
		    		name:_relief[idx].name,
		    		amount:_relief[idx].amt,
		    		active:_relief[idx].active
		    	})
			}

			return [200, {rows:__relief, count:relief().count()}, {}];
		});

		$httpBackend.whenPOST('/nhif/update').respond(function(method, url, data, headers){

			console.log('NHIF Update:', method, url, data, headers);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var nhif_ = nhif({id:data.id}).update(data)

				success = !!nhif_.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST("/nhif/add").respond(function(method, url, data, headers, params){

			console.log('NHIF Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				nhif.insert({

					id:nhif().count()+1,
					lbound:data.lbound,
					ubound:data.ubound,
					amt:data.amt
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST('/nhif/rates').respond(function(method, url, data, headers){

		    console.log('NHIF Rates:', method, url, data, headers);

		    var _nhif = nhif().get()

		    var __nhif = []

		    for(idx in _nhif){

		    	__nhif.push({

		    		id:_nhif[idx].id,
		    		lbound:_nhif[idx].lbound,
		    		ubound:_nhif[idx].ubound,
		    		amt:_nhif[idx].amt
		    	})
			}

			return [200, {rows:__nhif, count:nhif().count()}, {}];
		});

		$httpBackend.whenPOST('/paye/rates').respond(function(method, url, data, headers){

		    console.log('PAYE Rates:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _paye = paye().start(start_from).limit(pager.rows).get()

		    var __paye = []

		    for(idx in _paye){

				__paye.push({

					id:_paye[idx].id,
					lbound:_paye[idx].lbound,
					ubound:_paye[idx].ubound,
					rate_perc:_paye[idx].rate_perc
				})
			}

			return [200, {rows:__paye, count:paye().count()}, {}];
		});

		$httpBackend.whenPOST('/paye/update').respond(function(method, url, data, headers){

			console.log('Paye Update:', method, url, data, headers);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var paye_ = paye({id:data.id}).update(data)

				success = !!paye_.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST("/paye/add").respond(function(method, url, data, headers, params){

			console.log('Paye Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				paye.insert({

					id:paye().count()+1,
					lbound:data.lbound,
					ubound:data.ubound,
					rate_perc:data.rate_perc
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})

		$httpBackend.whenPOST('/period/update').respond(function(method, url, data, headers){

			console.log('Period Update:', method, url, data, headers);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var period_ = period({id:data.id}).update(data)

				success = !!period_.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST("/period/add").respond(function(method, url, data, headers, params){

			console.log('Period Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				period.insert({

					id:period().count()+1,
					start:data.start,
					end:data.end,
					status:data.status,
					active:data.active,
					descr:data.descr
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})

     	$httpBackend.whenPOST('/periods').respond(function(method, url, data, headers){

		    console.log('Periods:', method, url, data, headers);

		    var _periods = period().get()

		    var __periods = []

		    for(idx in _periods){

			    __periods.push({

			    	id:_periods[idx].id,
					start:_periods[idx].start,
					end:_periods[idx].end,
					status:_periods[idx].status,
					active:_periods[idx].active
			    })
			}

			return [200, {rows:__periods.reverse(), count:period().count()}, {}];
		}); 

		$httpBackend.whenPOST(/\/period\/(\d+)\/close/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Period Close:', method, url, data, headers);

			var success;

			try{

				var _period = period({id:parseInt(params.id)}).update({status:"Closed"})

				// console.log(_period.first())

				success = !!_period.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST(/\/period\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

		    console.log('Period:', method, url, data, headers, params);

      		var _period = period({id:parseInt(params.id)}).first()

      		var __period = {

      			id:_period.id,
				start:_period.start,
				end:_period.end,
				descr:_period.descr,
				status:_period.status,
				active:_period.active
      		}

			return [200, __period, {}];
		});

     	$httpBackend.whenPOST('/users').respond(function(method, url, data, headers){

		    console.log('Users:', method, url, data, headers);

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

     	$httpBackend.whenPOST('/login').respond(function(method, url, data, headers){

		    console.log('Login:', method, url, data, headers);

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

		$httpBackend.whenPOST(/\/dept\/(\d+)/, undefined, undefined, ["id"]).respond(function(method, url, data, headers, params){

		    console.log('Dept:', method, url, data, headers, params);

		    var _dept = depts({id:parseInt(params.id)}).first()

		    var __dept = {

	    		id:_dept.id,
	    		alias:_dept.alias,
	    		descr:_dept.descr
	    	}

			return [200, __dept, {}];
		});

		$httpBackend.whenPOST('/depts').respond(function(method, url, data, headers){

		    console.log('Depts:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _depts = depts().start(start_from).limit(pager.rows).get()

		    var __depts = []

		    for(idx in _depts){

		    	__depts.push({

		    		id:_depts[idx].id,
		    		alias:_depts[idx].alias,
		    		descr:_depts[idx].descr,
		    	})
			}

			return [200, {rows:__depts, count:depts().count()}, {}];
		});

		$httpBackend.whenPOST('/dept/update').respond(function(method, url, data, headers){

			console.log('Dept Update:', method, url, data, headers);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var dept = depts({id:data.id}).update(data)

				success = !!dept.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST("/dept/add").respond(function(method, url, data, headers, params){

			console.log('Dept Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				var dept = depts.insert({

					id:depts().count()+1,
					alias:data.alias,
					descr:data.descr
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})


		$httpBackend.whenPOST('/dept/list').respond(function(method, url, data, headers){

		    console.log('Dept List:', method, url, data, headers);

		    var _depts = depts().get()

			var __depts = []		    

		    for(idx in _depts){

		    	__depts.push({

		    		id:_depts[idx].id,
		    		descr:_depts[idx].descr,
		    	})
			}

			return [200, __depts, {}];
		});

		$httpBackend.whenPOST("/post/add").respond(function(method, url, data, headers, params){

			console.log('Post Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				var post = posts.insert({

					id:posts().count()+1,
					name:data.name,
					descr:data.descr,
					dept:data.dept
				})

				success = !!post.first();
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})

		$httpBackend.whenPOST('/post/update').respond(function(method, url, data, headers){

			console.log('Post Update:', method, url, data, headers);

			data = JSON.parse(data)

			data.id = parseInt(data.id)

			var success;

			try{

				var post = posts({id:data.id}).update(data)

				success = !!post.first();
			}
			catch(err){

				console.log(err)

				success = false
			}

			return [200, {"success":success}, {}]
		});

		$httpBackend.whenPOST(/\/post\/(\d+)/, undefined, undefined, ["id"]).respond(function(method, url, data, headers, params){

			console.log('Post:', method, url, data, headers, params);

			var _post = posts({id:parseInt(params.id)}).first()

			var _depts = [];

			$.each(depts().get(), function(idx, dept){

				_depts.push({

					id:dept.id,
					descr:dept.descr
				})
			})

			var __post = {

				id:_post.id,
				name:_post.name,
				descr:_post.descr,
				dept_id:_post.dept,
				depts:_depts
			}

			return [200, __post, {}]
		})


		$httpBackend.whenPOST('/post/list').respond(function(method, url, data, headers){

		    console.log('Post List:', method, url, data, headers);

		    var _posts = posts().get()

		    var __posts = []

		    for(idx in _posts){

		    	__posts.push({

		    		id:_posts[idx].id,
		    		name:_posts[idx].name
		    	})
			}

			return [200, __posts, {}];
		});

		$httpBackend.whenPOST('/posts').respond(function(method, url, data, headers){

		    console.log('Posts:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _posts = posts().start(start_from).limit(pager.rows).get()

		    var __posts = [];

		    for(idx in _posts){

		    	var dept = depts({id:_posts[idx].id}).first();

				__posts.push({

					id:_posts[idx].id,
					dept_name: dept.descr,
					dept_id: dept.id,
					name: _posts[idx].name,
					descr: _posts[idx].descr
				})
			}

			return [200, {rows:__posts.reverse(), count:posts().count()}, {}];
		});

		$httpBackend.whenPOST("/benefit/add").respond(function(method, url, data, headers, params){

			console.log('Benefit Add:', method, url, data, headers, params);

			data = JSON.parse(data)

			var success;

			try{

				var benefit = benefits.insert({

					id:benefits().count()+1,
					name:data.name,
					amount:data.amount,
					descr:data.descr,
					deduct:data.deduct,
					taxable:data.taxable,
					active:data.active,
					percentage:data.percentage
				})

				success = true;
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}]
		})

		$httpBackend.whenPOST("/benefit/update").respond(function(method, url, data, headers, params){

			console.log('Benefit Update:', method, url, data, headers, params);

			data = JSON.parse(data)
			data.id = parseInt(data.id)

			var success;

			try{

				// console.log(data)

				benefits({id:data.id}).update(data)

				success = true
			}
			catch(err){

				success = false
			}

			return [200, {"success":success}, {}];
		})

		$httpBackend.whenPOST(/\/benefit\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){

			console.log('Benefit:', method, url, data, headers, params);

			var benefit = benefits({id:parseInt(params.id)}).first()

			var _benefit = {

				id:benefit.id,
				name:benefit.name,
				amount:benefit.amount,
				descr:benefit.descr,
				percentage:benefit.percentage,
				deduct:benefit.deduct,
				taxable:benefit.taxable,
				active:benefit.active
			}

			return [200, _benefit, {}];
		})

		$httpBackend.whenPOST('/benefits').respond(function(method, url, data, headers){

		    console.log('Benefits:', method, url, data, headers);

		    var pager = JSON.parse(data);

		    var start_from = (pager.page - 1) * pager.rows;

		    var _benefits = benefits().start(start_from).limit(pager.rows).get()

			var __benefits = []

			for(idx in _benefits)
				__benefits.push({

					id:_benefits[idx].id,
					name:_benefits[idx].name,
					amount:_benefits[idx].amount,
					descr:_benefits[idx].descr,
					percentage:_benefits[idx].percentage,
					deduct:_benefits[idx].deduct,
					taxable:_benefits[idx].taxable,
					active:_benefits[idx].active
				})


			return [200, {rows:__benefits.reverse(), count:benefits().count()}, {}];
		});

		$httpBackend.whenPOST('/benefits/list').respond(function(method, url, data, headers){

		    console.log('Benefit List:', method, url, data, headers);

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