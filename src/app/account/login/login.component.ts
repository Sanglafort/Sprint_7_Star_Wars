import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm = this.fb.group({
    name: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required ]

  })

  constructor(private fb: FormBuilder) {}

}
