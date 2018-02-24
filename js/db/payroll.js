function newDate(date){

	var d = new Date(date);

	return d.toDateString();
}

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
		percentage:"False",
		deduct:"False",
		taxable:"False",
		active:"True"
	},
	{
		id:6,
		name:'Child Allowance',
		amount:"10",
		descr:'N/A',
		percentage:"True",
		deduct:"False",
		taxable:"False",
		active:"False"
	},
	{
		id:9,
		name:'Housing Allowance',
		amount:"10000.00",
		descr:'N/A',
		percentage:"False",
		deduct:"False",
		taxable:"True",
		active:"True"
	},
	{
		id:11,
		name:"NHIF",
		amount:"320.00",
		descr:"National Hospital Insurance Fund",
		percentage:"False",
		deduct:"True",
		taxable:"False",
		active:"True"
	},
	{
		id:12,
		name:"NSSF",
		amount:"320.00",
		descr:"National Social Security Fund",
		percentage:"False",
		deduct:"True",
		taxable:"False",
		active:"True"
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