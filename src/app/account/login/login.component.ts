import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm = this.fb.group({
    userName: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)] ]
  });
  public loading = false;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private http: HttpClient,
    private router: Router,
    ) {}

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.loginForm, field );
  }

  onSubmit() {
    this.http.get<any>('http://localhost:3000/users')
    .subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if(user) {
        alert('Login OK');
        console.log(res);
        this.loginForm.reset();
        this.router.navigate(['starships'])
      } else {
        alert('User not found');
      }
    })

  }

}
