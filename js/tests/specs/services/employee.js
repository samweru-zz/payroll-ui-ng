'use strict';

describe("Employee Service:", function(){

    var employeeService, $httpBackend;

    beforeEach(inject(function($injector){

      var $injector = angular.injector(['myApp']);
      employeeService = $injector.get('employeeService');
      $httpBackend = $injector.get('$httpBackend');
    }))

    it('should be defined', function(){

      expect(employeeService).toBeDefined();
    });


    it('should return employee record', function(){

      $httpBackend.expect("POST", /\/data\/employee\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params){
    
         console.log('Received these data:', method, url, data, headers, params);

         var employee = employees({id:parseInt(params.id)}).first()
  
         return [200, employee, {}];
      });

      var employeeId = 1;

      employeeService.get(employeeId).then(function(data){

        expect(data).toEqual(employees({id:employeeId}).first());
      })

      $httpBackend.flush()
    });

});
