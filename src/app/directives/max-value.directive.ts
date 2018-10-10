import { Directive, Input } from '@angular/core';
import { Validator, FormControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMaxValue]',
  providers:[{provide: NG_VALIDATORS, useExisting: MaxValueDirective,multi:true}]
})
export class MaxValueDirective implements Validator {

  @Input('appMaxValue') MaxValue:number;

  validate(control: FormControl): ValidationErrors {
    console.log(control.value+" smaller? than"+this.MaxValue);
    return control.value>this.MaxValue?{'IsTooBig':{'message':'this field cannot be bigger than '+this.MaxValue}}:null;
  }

  constructor() { }

}
