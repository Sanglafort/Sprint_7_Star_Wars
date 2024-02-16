import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
// import * as customValidators from '../../../shared/validators/validators';
// import { ValidatorsService } from '../../../shared/service/validators.service';
// import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    userName: ['', [ Validators.required ]],
    email: ['', [ Validators.required, ]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
     private validatorService: ValidatorService,
    ) {}

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.registerForm, field );
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
  }

}
