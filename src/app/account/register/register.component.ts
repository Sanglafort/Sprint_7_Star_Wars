import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule, RouterOutlet ],
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
    private authService: AuthService,
    private router: Router,
    ) {}

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.registerForm, field);
  }

  isEqualPassword () {
    return this.validatorService.passwordMatchValidator( this.registerForm );
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const user: User = {
        userName: this.registerForm.value.userName as string,
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string
      }
      this.http.post<any>('http://localhost:3000/register', user).subscribe({
        next: (res) => {
          alert('Register OK');
          console.log(res)
          localStorage.setItem('token', JSON.stringify(res));
          this.registerForm.reset();
          this.router.navigate(['login'])
        }, error: () => {
          alert('Something went wrong');
        }
      })
    }
  }

}
