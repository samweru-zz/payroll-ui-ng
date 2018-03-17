//2018 Rates
paye = TAFFY([

	{
		id:1,
		lbound:0,
		ubound:12298,
		rate_perc:10,
	},
	{
		id:2,
		lbound:12299,
		ubound:23885,
		rate_perc:15,
	},
	{
		id:3,
		lbound:23886,
		ubound:35472,
		rate_perc:20,
	},
	{
		id:4,
		lbound:35473,
		ubound:47059,
		rate_perc:25,
	},
	{
		id:5,
		lbound:47059,
		ubound:1000000000,
		rate_perc:30,
	}
])

nhif = TAFFY([

	{
		id:1,
		lbound:0,
		ubound:5999,
		amt:150,
	},
	{
		id:2,
		lbound:6000,
		ubound:7999,
		amt:300,
	},
	{
		id:3,
		lbound:8000,
		ubound:11999,
		amt:400,
	},
	{
		id:4,
		lbound:12000,
		ubound:14999,
		amt:500
	},
	{
		id:5,
		lbound:15000,
		ubound:19999,
		amt:600,
	},
	{
		id:6,
		lbound:20000,
		ubound:24999,
		amt:750,
	},
	{
		id:7,
		lbound:25000,
		ubound:29999,
		amt:850,
	},
	{
		id:8,
		lbound:30000,
		ubound:34999,
		amt:900,
	},
	{
		id:9,
		lbound:35000,
		ubound:39999,
		amt:950,
	},
	{
		id:10,
		lbound:40000,
		ubound:44999,
		amt:1000,
	},
	{
		id:11,
		lbound:45000,
		ubound:49999,
		amt:1100,
	},
	{
		id:12,
		lbound:50000,
		ubound:59999,
		amt:1200,
	},
	{
		id:13,
		lbound:60000,
		ubound:69999,
		amt:1300,
	},
	{
		id:14,
		lbound:70000,
		ubound:79999,
		amt:1400,
	},
	{
		id:15,
		lbound:80000,
		ubound:89999,
		amt:1500,
	},
	{
		id:16,
		lbound:90000,
		ubound:99999,
		amt:1600,
	},
	{
		id:17,
		lbound:100000,
		ubound:1000000000,
		amt:1700,
	}
])

relief = TAFFY([

	{
		id:1,
		name:"Personal Relief",
		// amt:1162,
		amt:1408, //2018 Rate
		active:true
	},
	{
		id:2,
		name:"Insurance Relief",
		amt:5000,
		active:false
	},
	{
		id:3,
		name:"Allowable Pension Fund Contribution",
		amt:20000,
		active:false
	},
	{
		id:4,
		name:"Allowable HOSP Contribution",
		amt:4000,
		active:false
	},
	{
		id:5,
		name:"Owner Occupier Interest",
		amt:12500,
		active:false
	}
])

users = TAFFY([

	{
		id:1,
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
		descr:"N/A",
		active: false
	},
	{
		id:2,
		start: getMonthFirstDay(new Date()).toDateString(),
		end: getMonthLastDay(new Date()).toDateString(),
		status: "Open",
		descr:"N/A",
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
		id:3,
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
		id:2,
		alias:'FIN',
		descr:'Finance Department'
	},
	{
		id:3,
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
		id:2,
		dept:2,
		name:'Finance Manager',
		descr:'Finance Head'
	}
]);

benefits = TAFFY([

	{
		id:1,
		name:'Travel Expenses',
		amount:10000,
		descr:'N/A',
		percentage:false,
		deduct:false,
		taxable:false,
		active:true
	},
	{
		id:2,
		name:'Child Allowance',
		amount:10,
		descr:'N/A',
		percentage:true,
		deduct:false,
		taxable:false,
		active:false
	},
	{
		id:3,
		name:'Housing Allowance',
		amount:10000,
		descr:'N/A',
		percentage:false,
		deduct:false,
		taxable:true,
		active:true
	},
	{
		id:4,
		name:"NSSF (Tier I)",
		amount:360,
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	},
	{
		id:5,
		name:"NSSF (Tier II)",
		amount:720,
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	},
	{
		id:6,
		name:"NSSF (Tier I & II)",
		amount:1080,
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	}
])

var i = 1;
var employees__ = [];
while(i<=20){

	var firstName = faker.name.firstName()
	var lastName = faker.name.lastName()
	var emailAddr = firstName+"."+lastName+"@"+faker.internet.domainName()

	var banks = ["Barclays", "Equity", "Co-operative", "I&M"]
	var bank = faker.finance.account() + " " + faker.random.arrayElement(banks) + " Bank"

	employees__.push({

		id: i++, 
		idno: randomFixedLengthInteger(7),
		nssf_no:randomFixedLengthInteger(9),
		nhif_no:randomFixedLengthInteger(7),
		pin:faker.random.alphaNumeric(12).toUpperCase(),
		email: emailAddr.toLowerCase(),
		mobile: faker.phone.phoneNumber(), 
		status: faker.random.arrayElement(["Active","Inactive"]),
		address: faker.address.streetName(),
		marital_status: faker.random.arrayElement(["Single","Married","Separated","Divorced"]),
		gender: faker.random.arrayElement(["Male","Female","Other"]),
		lastname: lastName, 
		firstname: firstName,
		county: faker.address.county(), 
		country:faker.address.country(),
		city:faker.address.city(),
		dob:faker.date.past(10, new Date("01/01/1990")).toDateString(),
		start_date:faker.date.future(1, new Date()).toDateString(),
		end_date:faker.date.past(1, new Date()).toDateString(),
		bank_details:bank,
		other_address:"",
		other_email:"",
		other_mobile:"",
		post:faker.random.arrayElement(posts().get().map(function(l){

			return l.id
		}))
	})
}

employees = TAFFY(employees__)

employee_benefits = TAFFY([

	{
		id:1,
		employee:10,
		benefit:5
	},
	{
		id:2,
		employee:10,
		benefit:1
	},
])

employee_pay = TAFFY([

	{
		id:1,
		employee:10,
		salary:100000,
		insurance_relief: 0
	},
	{
		id:2,
		employee:9,
		salary:90000,
		insurance_relief: 0
	}
])