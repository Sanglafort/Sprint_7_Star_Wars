import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm = this.fb.group({
    userName: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
    ) {}

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.loginForm, field );

  }

}
