import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function capitalLetter(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const val = <string>control.value;
        if(!val) return null;
        if(val.length === 0) return null;

        const firstLetter = val[0];
        if(firstLetter !== firstLetter.toLocaleUpperCase()){
            return {
                capitalLetter: {
                    message: 'La primera letra debe ser mayúscula'
                }
            }
        }

        return null;
    }
}