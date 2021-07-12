import { Validator, AbstractControl, FormGroup } from '@angular/forms'; 
import { Injectable } from '@angular/core'; 

@Injectable()
export class MatchPassword implements Validator {
    validate(formGroup: FormGroup){
        const { password, password_confirmation } = formGroup.value; 
        if (password === password_confirmation) { 
            return null; 
        } else {
            return { passwordsDontMatch: true };
        }
    }
}