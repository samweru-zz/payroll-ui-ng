app.controller("periodController", ["$scope", 
									"$http", 
									"periodService", 
									function($scope, $http, periodService){

	$scope.status = periodService.getStatus()

	$scope.addNew = function(){

		$scope.start_date = "";
		$scope.end_date = "";
		$scope.period_status = "New";
		$scope.descr = ""
		$scope.active = "No"	
	}

	$scope.submit = function(){

		var start = !isNull($scope.start_date)?(new Date($scope.start_date)).toDateString():"";
		var end = !isNull($scope.end_date)?(new Date($scope.end_date)).toDateString():"";

		var period = {

			"start":start,
			"end":end,
			"status":$scope.period_status == "New"?"Open":$scope.period_status,
			"descr":$scope.descr,
			"active":$scope.active == "Yes"
		}

		var validator = validate(period, {

			start:{

				name:"Start Date",
				required:true
			},
			end:{

				name:"End Date",
				required:true
			}
		})

		if(validator.isValid()){

			period = $.extend(period, validator.getSanitized())

			var periodSvr;

			if(!!$scope.id){

				period.id = $scope.id;
				periodSvr = periodService.update(period)
			}
			else periodSvr = periodService.add(period)

			$("body").LoadingOverlay("show")

			periodSvr.then(function(data){

				$scope.dialogPeriodOpen = false;

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#period-tbl").trigger("refresh")

				}, 400)
			})
		}
		else validator.flushMessage("Period")
	}

	$scope.cancelHandle = function(){

		$scope.dialogPeriodOpen = false;
	}

	$scope.okConfirmPeriodHandle = function(){

		var row = $("#period-tbl").getSelectedRow()	

		$scope.dialogConfirmPeriodOpen = false;

		$("body").LoadingOverlay("show")

		periodService.closePeriod(row.id).then(function(data){

			$("body").LoadingOverlay("hide")
			$("#period-tbl").trigger("refresh")
		})
	}

	$scope.cancelConfirmPeriodHandle = function(){

		$scope.dialogConfirmPeriodOpen = false;
	}

	$scope.okMsgPeriodHandle = function(){

		$scope.dialogMsgPeriodOpen = false
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogPeriodOpen = true;

				$scope.addNew()
			})				
		})

		var btnClose = $(document.createElement("BUTTON")).html("Close")
		btnClose.click(function(){

			var row = $("#period-tbl").getSelectedRow()	

			$scope.$apply(function(){

				if(JSON.stringify(row) == "{}"){

					$scope.dialogMsgPeriodOpen = true
					$scope.messagePeriod = "Please select period from grid!"
				}
				else{

					$scope.dialogConfirmPeriodOpen = true;
					$scope.confirmPeriod = "Are you sure you want to close period?"
				}
			})
		})

		return [

			[btnAdd, btnClose]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		periodService.get(row.id).then(function(data){

			$scope.dialogPeriodOpen = true;

			$scope.start_date = new Date(data.start);
			$scope.end_date = new Date(data.end);
			$scope.period_status = data.status
			$scope.descr = data.descr
			$scope.active = data.active?"Yes":"No"				
		})
	}

	$scope.customLoader = function(table, options, builder){

		periodService.getAll(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _periods = data.rows

			for(idx in _periods)
    			_periods[idx].active = _periods[idx].active?"Yes":"No"

			builder(table, data, options);
		})
	}
}])