import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, AsyncValidatorFn } from "@angular/forms"
import { from, Observable } from "rxjs"
import { delay, map, switchMap } from "rxjs/operators"
import { UserService } from "../services/user.service"

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

export function userValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    return from([control.value]).pipe(
      delay(500),
      switchMap<string, Observable<ValidationErrors | null>>(username => {

        console.log({ username })

        return userService.getUserByUsername(username).pipe(
          map(user => {
            console.log({ user })
            return user && user.id !== userService.currentUser.value?.id ? { userAlreadyExists: true } : null
          })
        )

      })
    )

  }
}

export function emailValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    return from([control.value]).pipe(
      delay(500),
      switchMap<string, Observable<ValidationErrors | null>>(email => {

        console.log({ email })

        return userService.getUserByEmail(email).pipe(
          delay(500),
          map(user => {
            console.log({ emailUser: user })
            return user && user.id !== userService.currentUser.value?.id ? { emailAlreadyExists: true } : null
          })
        )

      })
    )

  }
}
