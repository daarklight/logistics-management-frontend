import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {HttpError} from "../cargo/cargo-details/cargo-details.component";
import {tap} from 'rxjs/operators';


@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const logFormat = 'background: maroon; color: white';

    return next.handle(req).pipe(tap(event => {
    }, exception => {
      if (exception instanceof HttpErrorResponse) {
        localStorage.setItem('error-message', exception.error.message);
        switch (exception.status) {
          case HttpError.Unauthorized:
            this.router.navigate(['login']);
            break;
          case HttpError.Forbidden:
            console.log(exception.status + ', ' + exception.message)
            console.log(exception.status)
            if(localStorage.getItem('is-logged-in') != String(true)) {
              //localStorage.setItem('auth-error', String(true));
              this.router.navigate(['login']);
              break;
            }
            this.router.navigate(['error/403']);
            break;
          case HttpError.NotFound:
            this.router.navigate(['error/404']);
            break;
          default:
            this.router.navigate(['error/common']);
        }
      }
    }));
  }
}
