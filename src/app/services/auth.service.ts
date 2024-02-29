
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { User } from "../interfaces/user.interface";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logedIn = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  get isLogedIn() {
    return this.logedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();


    const token = localStorage.getItem('token');
    this.logedIn.next(!!token);
  }

  public setUserAuthenticated() {
    this.logedIn.next(true);
    localStorage.setItem('token', 'TOKEN_SECRET');
  }

  login(username: string, password: string) {
    return this.http.post<User>('http://localhost:3000/login', { username, password })
        .pipe(map(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}

  public logout() {
    this.logedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
