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
			columnHide:"@",
			toolbars:"=",
			css:"@",
			pager:"@",
			dblClickRow:"=",
			customAjaxLoader:"=",
			getToolbars:"="
	    },
	    replace:false,
	    link: function (scope, element, attrs) {

	    	// console.log(attrs)

            var gridOptions = {

            	title: attrs.title,
            	method: attrs.method,
            	url: attrs.url,
            	usePager:attrs.usePager || true,
            	singleSelect:attrs.singleSelect || false,
            	fixLeftColumn: attrs.fixLeftColumn || false,
            	fixHeader: attrs.fixHeader || false,
            	resizeColumns: attrs.resizeColumns || false,
            	columnHide: eval("("+attrs.columnHide+")") || null,
            	pager: eval("("+attrs.pager+")") || null,
            	css: eval("("+attrs.css+")") || null,
    		}

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