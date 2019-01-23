app.directive('currency', function($filter){

    return {

        restrict: 'A',
        require: 'ngModel',
        scope: {

            ngModel: '='
        },
        link: function(scope, el, attrs, ngModel){

            el.val($filter('currency')(ngModel.$modelValue));

            el.bind('focus', function(){

                el.val(el.val().replace(/,/g,''));
            });

            el.bind('blur', function(){

                var formattedVal = $filter('currency')(el.val(), "")
                el.val(formattedVal);
                scope.ngModel = formattedVal
            });
        }
    }
});