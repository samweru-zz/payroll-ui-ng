
// https://goo.gl/MP7UMX
Number.prototype.toMoney = function(){

	return this.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}


// https://goo.gl/d2r24q
function getMonthFirstDay(date){

	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	return firstDay;
}

// https://goo.gl/d2r24q
function getMonthLastDay(date){

	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	return lastDay;
}

// https://goo.gl/1SQbwG
function getShortDate(date){ //dd/mm/yyyy

	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();

	if(dd<10){

	    dd='0'+dd;
	} 
	if(mm<10){

	    mm='0'+mm;
	} 

	var date = dd+'/'+mm+'/'+yyyy;

	return date;
}

function newDate(date){

	var d = new Date(date);

	return d.toDateString();
}

//2018 Rates
paye = TAFFY([

	{
		lbound:0,
		ubound:12298,
		rate_perc:10,
	},
	{
		lbound:12299,
		ubound:23885,
		rate_perc:15,
	},
	{
		lbound:23886,
		ubound:35472,
		rate_perc:20,
	},
	{
		lbound:35473,
		ubound:47059,
		rate_perc:25,
	},
	{
		lbound:47059,
		ubound:1000000000,
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
		start: getMonthFirstDay(new Date()).toDateString(),
		end: getMonthLastDay(new Date()).toDateString(),
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
		amount:10000,
		descr:'N/A',
		percentage:false,
		deduct:false,
		taxable:false,
		active:true
	},
	{
		id:6,
		name:'Child Allowance',
		amount:10,
		descr:'N/A',
		percentage:true,
		deduct:false,
		taxable:false,
		active:false
	},
	{
		id:9,
		name:'Housing Allowance',
		amount:10000,
		descr:'N/A',
		percentage:false,
		deduct:false,
		taxable:true,
		active:true
	},
	{
		id:12,
		name:"NSSF (Tier I)",
		amount:360,
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	},
	{
		id:13,
		name:"NSSF (Tier II)",
		amount:720,
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	},
	{
		id:14,
		name:"NSSF (Tier I & II)",
		amount:1080,
		descr:"National Social Security Fund",
		percentage:false,
		deduct:true,
		taxable:false,
		active:true
	}
])


var randomFixedLengthInteger = function (length) {
	
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
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
		dob:faker.date.past(10, new Date("01/01/1990")),
		start_date:faker.date.future(1, new Date()),
		end_date:faker.date.past(1, new Date()),
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
		employee:1,
		benefit:5
	},
	{
		id:2,
		employee:1,
		benefit:6
	},
])