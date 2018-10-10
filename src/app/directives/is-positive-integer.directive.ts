import { Directive } from '@angular/core';
import { Validator, FormControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appIsPositiveInteger]',
  providers:[{provide: NG_VALIDATORS, useExisting: IsPositiveIntegerDirective,multi:true}]
})
export class IsPositiveIntegerDirective implements Validator {

  validate(control:FormControl): ValidationErrors {

    return typeof(control.value)==="number"&&Number.isInteger(control.value)&&control.value>=0?null:{'isNotPositiveInteger':{'message':'the value from this field must be a positive integer'}}
  }

  constructor() { }

}
