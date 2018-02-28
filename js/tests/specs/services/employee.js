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


    it('should return employee record', function(/*done*/){

      var employee = employees({id:1}).first()

      var employeeId = 1;
      $httpBackend.expect("POST", /\/data\/empoyee\/(\d+)/).respond(employee);
      // $httpBackend.expect("POST", "/data/employee/".concat(employeeId)).respond(employee);

      employeeService.get(employeeId).then(function(data){

        expect(data).toEqual(employee);
      })

      $httpBackend.flush()
    });

});
