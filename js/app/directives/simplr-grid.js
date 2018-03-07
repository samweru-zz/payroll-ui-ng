app.directive('jqSimplrGrid', function ($timeout){

	return{

		scope: {

			url:"@",
			method:"@",
			title:"@",
			usePager:"@",
			singleSelect:"@",
			fixLeftColumn:"@",
			fixHeader:"@",
			resizeColumns:"@",
			columns:"@",
			toolbars:"=",
			css:"@",
			pager:"@",
			dblClickRow:"=",
			customAjaxLoader:"=",
			getToolbars:"="
	    },
	    replace:false,
	    link: function (scope, element, attrs) {

	    	

            var gridOptions = {

            	title: attrs.title,
            	method: attrs.method,
            	url: attrs.url,
            	usePager:attrs.usePager == "true",
            	singleSelect:attrs.singleSelect == "true",
            	fixLeftColumn: attrs.fixLeftColumn == "true",
            	fixHeader: attrs.fixHeader == "true",
            	resizeColumns: attrs.resizeColumns == "true",
            	columns: eval("("+attrs.columns+")") || null,
            	pager: eval("("+attrs.pager+")") || null,
            	css: eval("("+attrs.css+")") || null,
    		}

    		// console.log(gridOptions)

    		if(scope.getToolbars)
    			gridOptions["toolbars"] = scope.getToolbars();

    		if(scope.dblClickRow)
    			gridOptions["dblClick"] = scope.dblClickRow;

    		if(scope.customAjaxLoader)
    			gridOptions["customLoader"] = scope.customAjaxLoader;

    		$timeout(function(){

              $(element).simplrGrid(gridOptions);
            
            },0);
		}
	}
})