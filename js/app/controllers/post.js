app.controller("postsController", ['$scope','$http','$httpBackend','$state', function($scope, $http, $httpBackend, $state){

	function populateDeptSelectBox(scope, row){

		$http.post("/data/dept-list.json").then(function(response){

			// console.log(response.data);

			$scope.depts = response.data

			if(!$.isEmptyObject(row)){

				$scope.dept = {

					"id": row.dept_id,
					"descr":row.dept_name
				}
			}
			else{

				$scope.dept = {}
			}
		})
	}

	$scope.cancelHandle = function(){

		$scope.dialogPostOpen = false;
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogPostOpen = true;
				$scope.name = "";
				$scope.descr = "";

				populateDeptSelectBox($scope)
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		// console.log(row)

		$scope.$apply(function(){

			$scope.dialogPostOpen = true;
			$scope.name = row.name
			$scope.descr = row.descr

			populateDeptSelectBox($scope, row)
		})
	}

	$scope.customLoader = function(table, options, builder){

		$http.post("/data/posts.json", {

		    page:options.pager.page,
		    rows:options.pager.rows
		})
		.then(function(response){

			//total-number-of-rows/rows-per-page
			options.pager.pages = Math.ceil(response.data.count/options.pager.rows);

			// console.log(response);
			builder(table, response.data, options);
		});	
	}	
}]);