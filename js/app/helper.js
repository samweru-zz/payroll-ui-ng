// https://goo.gl/MP7UMX
Number.prototype.toMoney = function(){

	return this.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

//https://goo.gl/RqTmkC
String.prototype.toSlug = function(){

	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
}

//https://goo.gl/RqTmkC
String.prototype.toCamel = function(){
	
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

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

function unformatMoney(moneyStr){

	return parseFloat(moneyStr.toString().replace(",", ""));
}

function randomFixedLengthInteger(length) {
	
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

function trimAny(val){

	return val.toString().trim()
}

function toFloat(val){

	return parseFloat(trimAny(val))
}