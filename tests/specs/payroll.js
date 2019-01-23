'use strict';

describe("Payroll Test:", function(){

    it('gross salary = net salary + deductions', function(){

      var gross_salary = 100000;

      //Tier I (salary <= 6000 then salary * 6%)
      //Tier II (salary > 6000 && salary <= 18000 then salary * 12%)
      //Tier I + II (salary > 18000 then I + II)

      //Tier I + II
      var nssf_contrib = 1080 

      var taxable_pay = gross_salary - nssf_contrib;
      var salary = taxable_pay;

      console.log("NSSF Contribution: " + nssf_contrib.toMoney())
      console.log("Salary After NSSF (Taxable Pay): " + taxable_pay.toMoney())

      var paye_amount = []
      $.each(paye().get(), function(idx, rate){

        var ubound = 0
        if(taxable_pay >= rate.lbound){

          if(taxable_pay > rate.ubound)
            ubound  = rate.ubound
          else
            ubound = taxable_pay
          
          paye_amount.push((rate.rate_perc/100)*(ubound - rate.lbound))
        }
      })

      var paye_total = paye_amount.reduce(function(total, num){

        return total + num;
      })

      console.log("Tax (Before Relief): " + paye_total.toMoney())

      var personal_relief = relief({name:"Personal Relief"}).first()

      console.log("Personal Relief: " + personal_relief.amt.toMoney())

      var tax = paye_total - personal_relief.amt;

      console.log("Tax (After Relief): " + tax.toMoney())

      salary = salary - tax

      console.log("Salary After Tax: " + salary.toMoney())

      var nhif_amount = 0;
      $.each(nhif().get(), function(idx, rate){

        if(gross_salary >= rate.lbound && gross_salary <= rate.ubound)
          nhif_amount = rate.amt;
      })

      var net_salary = salary - nhif_amount;

      console.log("NHIF Contribution: " + nhif_amount.toMoney())
      console.log("Salary After NHIF (Net Salary): " + net_salary.toMoney())

      var deductions = nssf_contrib + nhif_amount + tax;

      console.log("Total Deductions: "+ deductions.toMoney())

      expect(gross_salary).toEqual(net_salary+deductions)
    });

});
