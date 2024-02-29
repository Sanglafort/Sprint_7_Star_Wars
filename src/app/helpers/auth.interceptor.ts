/*import { HttpEvent, HttpHandlerFn HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  if(token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })
  }



  console.log(request.url);
  return next(request);
};*/

/*
Y en app.config.ts se cambia:

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(
    withFetch(),
    withInterceptors([authInterceptor])
  ),
  ],
};
 */


/* DOMINI CODE:
import { HttpErrorResponse } from "@angular/common/http";
import { OperatorFunction, catchError, throwError } from "rxjs";

export const ErrorResponseInterceptor = (req: any, next: (arg0: any) => { (): any; new(): any; pipe: { (arg0: OperatorFunction<unknown, unknown>): any; new(): any; }; }) => next(req).pipe(catchError(handleErrorResponse));

function handleErrorResponse(error: HttpErrorResponse) {
  // console.log('My error', error);
  const errorResponse = `Error status ${error.status}, mensaje ${error.message}`;
  return throwError(() => errorResponse);
}

Y en app.config.ts se cambia:

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(
    withFetch(),
    withInterceptors([ErrorResponseInterceptor])
  ),
  ],
};

*/
