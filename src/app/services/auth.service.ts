
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, firstValueFrom, tap } from "rxjs";
import { User } from "../interfaces/user.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl: string;
  userValue: any;

  constructor() {
    this.baseUrl = 'http://localhost:3000/users';
  }

  register( formValue: any ) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}`, formValue)
    )
  }

  login( formValue: any ) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}`, formValue)

    )
  }

 /* private apiUrl: string = 'http://localhost:3000/';
  private user?: User;


  constructor( private http: HttpClient, private router: Router ) {}

  getCurrentUser(): User | undefined {
    if(!this.user) return undefined
    return { ...this.user };
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  checkUserAndPassword(user:string, pass:string) {
    this.getUsers().subscribe(users => {
      users.find(u => {
        if(u.password === pass && u.email === user) {
          this.user = u;
          localStorage.setItem('token', u.id.toString())
          this.router.navigate(['/starships'])
        }
      })
    })
  }

  checkStatusAuth(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if(!token) {
      return of(false)
    }
    return this.http.get<User>(`${this.apiUrl}/${token}`)
    .pipe(
      tap(u => this.user = u),
      map(u => !!u),
      catchError(err => of(false))
    )
  }

  logout() {
    this.user = undefined;
    localStorage.clear()
  }*/

  /*private apiUrl: string = 'http://localhost:3000/';

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  public login(user: {
    username: string, password: string
  }): Observable<any> {
    return this.http.post('apiUrl', user).pipe(
      tap(tokens => this.doLoginUser(user.username, tokens))
    )
  }

  private doLoginUser( username:string, tokens: any ) {
    this.loggedUser = username;
    this.storeJwtToken(tokens.jwt);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken( jwt: string ) {
    localStorage.setItem(this.JWT_TOKEN, jwt)
  }

  public logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false)
  }*/

}
