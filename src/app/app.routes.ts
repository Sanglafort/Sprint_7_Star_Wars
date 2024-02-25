import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { DetailsComponent } from './components/starship-list/details/details.component';
import { AuthGuard } from './helpers/auth.guard';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent},
  { path: 'home', title: 'Home', component: HomeComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'starships', title: 'Starships', component: StarshipListComponent}, // canActivate: [AuthGuard]},
  { path: 'starships/:id', title: 'Starship Card', component: DetailsComponent},

  { path: '**', redirectTo: '', pathMatch: 'full'},

];
