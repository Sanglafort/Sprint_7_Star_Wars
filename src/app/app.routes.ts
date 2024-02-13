import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { DetailsComponent } from './components/starship-list/details/details.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent},
  { path: 'home', title: 'Home', component: HomeComponent},
  { path: 'starships', title: 'Starships', component: StarshipListComponent},
  { path: 'starships/:id', title: 'Starship Card', component: DetailsComponent},

  { path: '**', redirectTo: ''},

  /*Del tutorial:
  { path: '' , component: HomeComponent}, // , canActivate: [AuthGuard]},
  { path: 'account/login' , component: LoginComponent},
  { path: 'account/register' , component: RegisterComponent},
  { path: '**' , redirectTo: ''},*/

];
