import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators {

  static formFieldHasError(formControl: AbstractControl, errorName: string): boolean {
    return formControl.touched && formControl.errors !== null && formControl.errors[errorName]
  }

  static passwordConfirmationValidator(formGroup: FormGroup): (ValidationErrors | null) {
    const password = formGroup.value.password;
    const confirmation = formGroup.value.confirmation;

    if (password && confirmation) {
      console.log(formGroup)
      if (password !== confirmation) {
        let error: ValidationErrors = {notSame: true};
        formGroup.controls["confirmation"].setErrors(error, {emitEvent: error !== null && formGroup.controls["confirmation"].touched});
        return error;
      }
    }
    return null;
  }
}