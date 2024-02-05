import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

export const routes: Routes = [
  { path: '' , component: HomeComponent}, // , canActivate: [AuthGuard]},
  { path: 'account/login' , component: LoginComponent},
  { path: 'account/register' , component: RegisterComponent},
  { path: '**' , redirectTo: ''},

];
