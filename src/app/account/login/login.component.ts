import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm!: FormGroup;

  public loading = false;
  public submitted = false;
  public error?: string;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });
  }

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.loginForm, field );
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res) => {
        alert('Login OK');
        this.loginForm.reset();
        localStorage.setItem('token', JSON.stringify(res.accessToken));
        this.router.navigate(['starships'])
      }

    })

}

}
