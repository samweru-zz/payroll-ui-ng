function validate(data, meta, customValidation){

	var self = this;

	self.__data = data;
	self.__meta = meta;

	var sanitizers = {

		currency:function(val){

			return parseFloat(val.toString().split(",").join(""))
		},
		number:function(val){

			return toFloat(val)
		},
		alphaOrNumericOrBoth:function(val){

			return trimAny(val)
		}
	}

	var validators = {

		currency:function(val){

			return isCurrency(val)
		},
		number:function(val){

			return self.sanitize(val, "number")
		},
		alphaOrNumericOrBoth:function(val){

			return /^[\w.\s]+$/i.test(self.sanitize(val, "alphaOrNumericOrBoth"))
		}
	}

	var custVal = {};

	for(funcName in customValidation){

		custVal[funcName] = customValidation[funcName].format
	}

	validators = $.extend(validators, custVal)

	self.validator = function(val, format){

		if(isEmpty(val))
			return false;

		return validators[format](val)
	}

	self.sanitize = function(val, format){

		return sanitizers[format](val)
	}

	self.between = function(val, between){

		var from = parseFloat(between.from)
		var to = parseFloat(between.to)
		var val = parseFloat(val)

		return val >= from && val <= to
	}

	self.getState = function(){

		var state = {}

		for(key in self.__meta){
			
			var val = self.__data[key];

			state[key] = {

				"name":self.__meta[key].name,
				"value":val
			}

			var keys = Object.keys(self.__meta[key])

			if(keys.includes("format")){

				state[key].format = self.__meta[key].format;
				state[key].formatValid = self.validator(val, state[key].format)
			}

			if(keys.includes("required"))
				state[key].empty = isEmpty(val)

			if(keys.includes("range")){

				state[key].range = self.__meta[key].range
				state[key].rangeValid = self.between(val, self.__meta[key].range)
			}
		}

		// console.log(state)

		return state;
	}

	self.getSanitized = function(){

		var sanitized = {};

		var state = self.getState()

		for(key in state){

			var keys = Object.keys(state[key])
			var val = state[key].value

			if(keys.includes("format")){

				if(Object.keys(sanitizers).includes("format"))
					sanitized[key] = self.sanitize(state[key].value, state[key].format)
			}
			else{

				if(isNumeric(val))
					sanitized[key] = self.sanitize(val, "number")
				else if(isBool(val))
					sanitized[key] = val
				else
					sanitized[key] = trimAny(val)
			}
		}

		return sanitized;
	}

	self.isValid = function(){

		var state = self.getState()

		for(key in state){

			var keys = Object.keys(state[key])

			if(keys.includes("formatValid"))
				if(state[key].formatValid == false)
					return false;

			if(keys.includes("rangeValid"))
				if(state[key].rangeValid == false)
					return false;

			if(keys.includes("empty"))
				if(state[key].empty)
					return false;
		}

		return true;
	}

	self.flushMessage = function(title){

		var state = self.getState()

		var _messages = []

		for(key in state){
		
			var valid = true

			var _keys = Object.keys(state[key])

			if(_keys.includes("formatValid")){

				if(state[key].formatValid == false){

					_messages[key] = $.extend({}, _messages[key], {

						formatValid:state[key].formatValid,
						format:state[key].format
					})

					valid = false
				}
			}

			if(_keys.includes("empty")){

				if(state[key].empty){

					_messages[key] = $.extend({}, _messages[key], {

						empty:state[key].empty
					})

					valid = false
				}
			}

			if(_keys.includes("rangeValid")){

				if(state[key].rangeValid == false){

					_messages[key] = $.extend({}, _messages[key], {

						rangeValid:state[key].rangeValid
					})

					valid = false
				}
			}

			if(valid == false){

				_messages[key] = $.extend({}, _messages[key], {

					name:state[key].name
				})
			}
		}

		var keys = Object.keys(_messages)
		var lastKey = keys[keys.length-1]

		var messages = []

		for(key in _messages){

			messages.push("<b>"+ _messages[key].name +"</b><br>")

			var keys = Object.keys(_messages[key])

			if(keys.includes("formatValid")){

				if(_messages[key].formatValid == false){

					var format = _messages[key].format
					if(format.toCamel() == format)
						format = format.toSlug().split("-").join(" ");

					messages.push("Has to be a " + format + "!<br>");
				}
			}

			if(keys.includes("empty"))
				if(_messages[key].empty)
					messages.push("Is required!<br>")

			if(keys.includes("rangeValid"))
				if(_messages[key].rangeValid == false)
					messages.push("Must be between " + state[key].range.from +
									" to " + state[key].range.to +
									"!<br>")

			if(lastKey != key)
				messages.push("<hr>")
		}

		if(messages.length > 0)
			$.growl({ title:title, message: messages.join("") });
	}

	return self;
}

//https://goo.gl/9iBmSD
function isInt(n){

    return Number(n) === n && n % 1 === 0;
}

//https://goo.gl/9iBmSD
function isFloat(n){

    return Number(n) === n && n % 1 !== 0;
}

function isBool(val){

	return typeof val == "boolean"
}

function isNull(val){

	return val == null
}

function isEmpty(val){

	return isNull(val) || typeof val == "undefined" || val.toString().trim() == ""
}

function isNumeric(val){

	 return !isBool(val) && !isNaN(val) && !isNull(val) && !isEmpty(val)
}

function isCurrency(val){

	var currFormat = /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/

	return currFormat.test(val)
}