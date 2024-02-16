import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, ]],
    username: ['', [Validators.required, ]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    // private validatorsService: ValidatorsService
    ) {}

//  isValidField( field: string ) {
//    return this.validatorsService.isValidField( this.myForm, field );
//  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
