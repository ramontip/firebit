import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms"

// Validators

export function matchValidator(fieldname: string, not = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent

    // We dont care about anything but FormGroups
    if (!(formGroup instanceof FormGroup)) {
      return null
    }

    if ((!not && control.value !== formGroup.controls[fieldname].value) ||
      (not && control.value === formGroup.controls[fieldname].value)) {
      return { ["match_" + fieldname]: true }
    }

    return null
  }
}

// Async Validators
