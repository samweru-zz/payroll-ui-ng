function validate(data, meta){

	this.__data = data;
	this.__meta = meta;

	var self = this;

	this.validator = function(val, format){

		return !self.isEmpty(val)

		var validators = {

			currency:function(val){

				var currFormat = /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/

				return currFormat.test(val)
			},
			integer:function(val){

				return self.sanitize(val, "integer") != NaN
			}
		}

		return validators[format](val)
	}

	this.sanitize = function(val, format){

		var sanitizers = {

			currency:function(val){

				return parseFloat(val.toString().split(",").join(""))
			},
			integer:function(val){

				return parseInt(val);
			}
		}

		return sanitizers[format](val)
	}

	this.isEmpty = function(val){

		return typeof val == "undefined" || val.trim("") == ""
	}


	this.getState = function(){

		var state = {}

		for(key in self.__meta){
			
			var val = self.__data[key];
			var format = self.__meta[key].format
			var valid = self.validator(val, format)
			var name = self.__meta[key].name

			state[key] = {

				"valid":valid,
				"value":val,
				"format":format,
				"name":name
			}

			if(Object.keys(self.__meta[key]).includes("required"))
				state[key].empty = self.isEmpty(val)
		}

		return state;
	}

	this.getSanitized = function(){

		var sanitized = {};

		var state = self.getState()

		for(key in state)
			sanitized[key] = self.sanitize(state[key].value, state[key].format)

		return sanitized;
	}

	this.isValid = function(){

		var state = self.getState()

		for(key in state)
			if(state[key].valid == false)
				return false;

		return true;
	}

	return this;
}