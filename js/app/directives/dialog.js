app.directive('jqDialog', function ($timeout){

    return {

        scope: { 
            okButton: '@',
            okCallback: '=',
            cancelButton: '@',
            cancelCallback: '=',
            open: '@',
            title: '@',
            width: '@',
            height: '@',
            show: '@',
            hide: '@',
            autoOpen: '@',
            resizable: '@',
            closeOnEscape: '@',
            hideCloseButton: '@'
        },
        replace:false,
        // transclude: true,    // transclusion allows for the dialog 
                              // contents to use angular {{}}
        // template: '<div ng-transclude></div>',      // the transcluded content 
                                                    //is placed in the div
        // scope:false,
        // require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            // Close button is hidden by default
            var hideCloseButton = attrs.hideCloseButton || true;
            
            // Specify the options for the dialog
            var dialogOptions = {

                autoOpen: attrs.autoOpen || false,
                title: attrs.title,
                width: attrs.width || "auto",
                height: attrs.height || "auto", 
                modal: attrs.modal || false,
                show: attrs.show || '',
                hide: attrs.hide || '',
                draggable: attrs.draggable || true,
                resizable: attrs.resizable,
                closeOnEscape: attrs.closeOnEscape || false,
                beforeClose:function(event, ui){

                    // console.log(event)

                    // $(this).dialog('close')

                    // console.

                    // return false;
                },
                close: function() {

                    // $(this).preventDefault()
                    // console.log('closing...');
                    //console.log(scope);
                    if(scope.cancelCallback)
                        $timeout(function() {
                           scope.$apply(scope.cancelCallback());
                        },0);    
                    

                    // $(this).dialog('close')//.destroy()

                    // return false;
                },
                open: function(event, ui) { 

                    // Hide close button 
                    if(hideCloseButton == true){

                      $(".ui-dialog-titlebar-close", ui.dialog).hide();
                    }
                } 
            };
           
            // Add the buttons 
            dialogOptions['buttons'] = [];

            if(attrs.okButton) {

               var btnOptions = { 

                  text: attrs.okButton, 
                  click: function(){ 

                    scope.$apply(scope.okCallback());
                    
                    // scope.$apply(function(){

                      // scope.dialogMsgOpen = false;
                      // console.log(scope)
                    // })
                    // $(this).hide()
                    // scope.dialogMsgOpen = "false";
                    // console.log(attrs)

                    // $(this).dialog("close")

                    // attrs.
                    // attrs.open = false;
                    // scope.$apply();
                  }
               };

               dialogOptions['buttons'].push(btnOptions);    
            }
           
            if(attrs.cancelButton) {

               var btnOptions = {

                  text: attrs.cancelButton, 
                  click: function(){ 

                    scope.$apply(scope.cancelCallback()); 
                  }
               };

               dialogOptions['buttons'].push(btnOptions);    
            }
           
            // Initialize the element as a dialog
            // For some reason this timeout is required, otherwise it doesn't work
            // for more than one dialog
            $timeout(function(){

              $(element).dialog(dialogOptions);
            
            },0);
            
            // This works when observing an interpolated attribute
            // e.g {{dialogOpen}}.  In this case the val is always a string and so
            // must be compared with the string 'true' and not a boolean
            // using open: '@' and open="{{dialogOpen}}"
            // attrs.$observe('open', function(val){

            //     console.log('observing open val=' + val);

            //     if (val == 'true'){

            //       console.log('open');
            //       $(element).dialog("open");
            //     } 
            //     else{

            //       console.log('close');
            //       $(element).dialog("close");
            //     }
            // });
            
            // // This allows title to be bound
            // attrs.$observe('title', function(val){

            //   console.log('observing title: val=' + val);
            //   $(element).dialog("option", "title", val);                   
            
            // });

            attrs.$observe('open', function(open){

              if(open == 'false')
                $(element).dialog("close");
              else if(open == 'true')
                $(element).dialog("open");
            });
        } 
    }
});  