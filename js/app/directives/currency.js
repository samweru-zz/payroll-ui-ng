app.directive('currency', function($filter){

    return {

        require: '?ngModel',
        link: function(scope, el, attrs, ctrl){

            el.val($filter('currency')(ctrl.$modelValue));

            el.bind('focus', function(){

                el.val(el.val().replace(/,/g,''));
            });

            // el.bind('input', function(){
            //   scope.amount = el.val();
            //   scope.$apply();
            // });

            el.bind('blur', function(){

                el.val($filter('currency')(el.val(), ""));
            });
        }
    }
});