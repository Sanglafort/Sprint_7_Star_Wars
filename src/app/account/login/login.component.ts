import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

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
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });


   // this.submitted = true;
   // this.loading = true;
   /* this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(first())
    .subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.loginForm.value.email &&
        a.password === this.loginForm.value.password;
      })
      if(user) {
        alert('Login OK');
        this.loginForm.reset();
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['starships'])
      }
    })
  }

}*/
  }
}
