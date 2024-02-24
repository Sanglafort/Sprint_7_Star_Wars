import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    userName: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private http: HttpClient,
    private router: Router,
    ) {}

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.registerForm, field);
  }

  isEqualPassword () {
    return this.validatorService.passwordMatchValidator( this.registerForm );
  }

  register() {
    this.http.post<any>('http://localhost:3000/users', this.registerForm.value)
    .subscribe(res => {
      alert('Register OK!');
      this.registerForm.reset();
      this.router.navigate(['login']);
    })
  }

}
