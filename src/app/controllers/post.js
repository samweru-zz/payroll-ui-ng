app.controller("postsController", ['$scope',
									'$http',
									'$state',
									'postService', 
									'deptService',
									function($scope, $http, $state, postService, deptService){

	$scope.cancelHandle = function(){

		$scope.dialogPostOpen = false;
	}

	$scope.submit = function(){

		console.log($scope.dept)

		var post = {

			name:$scope.name,
			descr:$scope.descr,
			dept:$scope.dept
		}

		var validator = validate(post, {

			name:{

				name:"Name",
				format:"alphaOrNumericOrBoth",
				required:true
			},
			dept:{

				name:"Department Name",
				required:true
			}
		})

		if(validator.isValid()){

			post = $.extend(post, validator.getSanitized())

			var postSrv;
			if(!!$scope.id){

				post.id = $scope.id
				postSrv = postService.update(post)
			}
			else postSrv = postService.add(post)

			$("body").LoadingOverlay("show")

			postSrv.then(function(data){

				$scope.dialogPostOpen = false;

				setTimeout(function(){

					$("body").LoadingOverlay("hide")
					$("#posts-tbl").trigger("refresh")

				},400)
			})
		}
		else validator.flushMessage("Post")
	}

	$scope.toolbars = function(){

		var btnAdd = $(document.createElement("BUTTON")).html("Add")
		btnAdd.click(function(){
			
			$scope.$apply(function(){

				$scope.dialogPostOpen = true;

				$scope.id = ""
				$scope.name = ""
				$scope.descr = ""
				$scope.dept = null

				deptService.getList().then(function(data){

					$scope.depts = data					
				})
			})				
		})

		return [

			[btnAdd]
		]
	}

	$scope.dblClick = function(){

		var row = $(this).getRow();

		postService.get(row.id).then(function(data){

			$scope.dialogPostOpen = true;

			$scope.id = data.id
			$scope.name = data.name
			$scope.descr = data.descr
			$scope.depts = data.depts

			for(idx in data.depts)
				if(data.depts[idx].id == data.dept_id)
					$scope.dept = data.depts[idx]
		})
	}

	$scope.customLoader = function(table, options, builder){

		postService.getPosts(options.pager).then(function(data){

			options.pager.pages = Math.ceil(data.count/options.pager.rows);

			var _posts = data.rows

			var __posts = []

			for(idx in _posts){

				__posts.push({

					"id":_posts[idx].id,
					"name":_posts[idx].name,
					"dept_name": _posts[idx].dept_name,
					"dept_id": _posts[idx].dept_id
				})
			}

			data.rows = __posts

			builder(table, data, options);
		})
	}	
}]);