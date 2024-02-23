import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorService {

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
  }

  public passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

}
