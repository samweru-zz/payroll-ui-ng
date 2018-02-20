app.directive('jqTreeMenu', function ($timeout){

	return{

	    replace:false,
	    link: function (scope, element, attrs) {

    		$timeout(function(){

              $(element)
				.find("ul:has(li) span")
					.next()
						.click(function(){

							var ul = $(this).next();

							if($(this).prev().html() == "+"){

								$(this).prev().html("-")
								ul.show();
							}
							else{

								$(this).prev().html("+")
								ul.hide();
							}
						})
						.click();
	            
            },0);
		}
	}
})