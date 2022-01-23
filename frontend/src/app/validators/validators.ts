import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms"

// Validators

// { match_fieldname: true }
export function matchValidator(fieldname: string, options?: { not?: boolean }): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent

    // We dont care about anything but FormGroups
    if (!(formGroup instanceof FormGroup)) {
      return null
    }

    const splitFieldname = fieldname.split(/(?=[A-Z])/g).join(" ").toLowerCase()

    const validate = (a: any, b: any) => options?.not ? a === b : a !== b

    if (validate(control.value, formGroup.controls[fieldname].value)) {
      return { [`match_${fieldname}`]: `Must ${options?.not ? "differ from" : "match"} ${splitFieldname}` }
    }

    return null
  }
}

// Async Validators
