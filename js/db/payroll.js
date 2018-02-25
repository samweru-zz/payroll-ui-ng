function newDate(date){

	var d = new Date(date);

	return d.toDateString();
}

paye = TAFFY([

	{
		annual_lbound:0,
		annual_ubound:134164,
		monthly_lbound:0,
		monthly_ubound:11180,
		rate_perc:10,
	},
	{
		annual_lbound:134164,
		annual_ubound:260567,
		monthly_lbound:11180,
		monthly_ubound:21714,
		rate_perc:15,
	},
	{
		annual_lbound:260567,
		annual_ubound:386970,
		monthly_lbound:21714,
		monthly_ubound:32248,
		rate_perc:20,
	},
	{
		annual_lbound:386970,
		annual_ubound:513373,
		monthly_lbound:32248,
		monthly_ubound:42781,
		rate_perc:30,
	},
	{
		annual_lbound:513373,
		annual_ubound:1000000000,
		monthly_lbound:42781,
		monthly_ubound:1000000000,
		rate_perc:30,
	}
])

nhif = TAFFY([

	{
		lbound:0,
		ubound:5999,
		amt:150,
		descr:"N/A"
	},
	{
		lbound:6000,
		ubound:7999,
		amt:300,
		descr:"N/A"
	},
	{
		lbound:8000,
		ubound:11999,
		amt:400,
		descr:"N/A"
	},
	{
		lbound:12000,
		ubound:14999,
		amt:500,
		descr:"Plus Self Employed"
	},
	{
		lbound:15000,
		ubound:19999,
		amt:600,
		descr:"N/A"
	},
	{
		lbound:20000,
		ubound:24999,
		amt:750,
		descr:"N/A"
	},
	{
		lbound:25000,
		ubound:29999,
		amt:850,
		descr:"N/A"
	},
	{
		lbound:30000,
		ubound:34999,
		amt:900,
		descr:"N/A"
	},
	{
		lbound:35000,
		ubound:39999,
		amt:950,
		descr:"N/A"
	},
	{
		lbound:40000,
		ubound:44999,
		amt:1000,
		descr:"N/A"
	},
	{
		lbound:45000,
		ubound:49999,
		amt:1100,
		descr:"N/A"
	},
	{
		lbound:50000,
		ubound:59999,
		amt:1200,
		descr:"N/A"
	},
	{
		lbound:60000,
		ubound:69999,
		amt:1300,
		descr:"N/A"
	},
	{
		lbound:70000,
		ubound:79999,
		amt:1400,
		descr:"N/A"
	},
	{
		lbound:80000,
		ubound:89999,
		amt:1500,
		descr:"N/A"
	},
	{
		lbound:90000,
		ubound:99999,
		amt:1600,
		descr:"N/A"
	},
	{
		lbound:100000,
		ubound:1000000000,
		amt:1700,
		descr:"N/A"
	}
])

relief = TAFFY([

	{
		id:1,
		name:"Personal Relief",
		monthly:1162,
		active:true
	},
	{
		id:2,
		name:"Insurance Relief",
		monthly:5000,
		active:false
	},
	{
		id:3,
		name:"Allowable Pension Fund Contribution",
		monthly:20000,
		active:false
	},
	{
		id:4,
		name:"Allowable HOSP Contribution",
		monthly:4000,
		active:false
	},
	{
		id:5,
		name:"Owner Occupier Interest",
		monthly:12500,
		active:false
	}
])

users = TAFFY([

	{
		username:"sa", 
		password:"p@55w0rd",
		role:1
	}
])

period = TAFFY([

	{
		id:1,
		start: newDate("01/01/2018"),
		end: newDate("01/31/2018"),
		status: "Closed",
		active: false
	},
	{
		id:2,
		start: newDate("02/01/2018"),
		end: newDate("02/28/2018"),
		status: "Open",
		active: true
	}
])

roles = TAFFY([
	
	{
		id:1,
		name:'Administrator',
		descr:'Super Administrator/Root User'
	},
	{
		id:2,
		name:'Payroll Administrator',
		descr:'Payroll Administrator/Payroll Manager'
	},
	{
		id:4,
		name:'Payroll User',
		descr:'Normal User/Payroll User'
	}
]);

depts = TAFFY([

	{
		id:1,
		alias:'HR',
		descr:'Human Resource Department'
	},
	{
		id:3,
		alias:'FIN',
		descr:'Finance Department'
	},
	{
		id:4,
		alias:'IT',
		descr:'Information Technology and Support'
	}
])

posts = TAFFY([

	{
		id:1,
		dept:1,
		name:'HR Manager',
		descr:'Human Resource Managers'
	},
	{
		id:3,
		dept:3,
		name:'Finance Manager',
		descr:'Finance Head'
	}
]);

benefits = TAFFY([

	{
		id:5,
		name:'Travel Expenses',
		amount:"10000.00",
		descr:'N/A',
		percentage:false,
		deduct:false,
		taxable:false,
		active:true
	},
	{
		id:6,
		name:'Child Allowance',
		amount:"10",
		descr:'N/A',
		percentage:true,
		deduct:false,
		taxable:false,
		active:false
	},
	{
		id:9,
		name:'Housing Allowance',
		amount:"10000.00",
		descr:'N/A',
		percentage:false,
		deduct:false,
		taxable:true,
		active:true
	},
	{
		id:12,
		name:"NSSF",
		amount:"320.00",
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	}
])


function randomNumber(times){

	return Math.floor(Math.random() * parseInt("9"+Array(times).join(9)))
}

var i = 1;
var employees__ = [];
while(i<=20){

	var firstName = faker.name.firstName()
	var lastName = faker.name.lastName()
	var emailAddr = firstName+"."+lastName+"@"+faker.internet.domainName()

	var banks = ["Barclays", "Equity", "Co-operative", "I&M"]
	var bank = faker.finance.account() + " " + faker.random.arrayElement(banks) 

	employees__.push({

		id: i++, 
		idno: randomNumber(7),
		nssf_no:randomNumber(9),
		nhif_no:randomNumber(7),
		pin:faker.random.alphaNumeric(12).toUpperCase(),
		email: emailAddr.toLowerCase(),
		mobile: faker.phone.phoneNumber(), 
		status: faker.random.arrayElement(["Active","Inactive"]),
		address: faker.address.streetName(),
		marital_status: faker.random.arrayElement(["Single","Married","Separated","Divorced"]),
		lastname: lastName, 
		firstname: firstName,
		county: faker.address.county(), 
		country:faker.address.country(),
		city:faker.address.city(),
		dob:faker.date.past(10, new Date("01/01/1990")),
		start_date:faker.date.future(1, new Date()),
		end_date:faker.date.past(1, new Date()),
		bank_details:bank,
		other_address:"",
		other_email:"",
		other_mobile:"",
		post:""
	})
}

employees = TAFFY(employees__)