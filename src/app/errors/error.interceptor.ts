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
        switch (exception.status) {
          case HttpError.Forbidden:
            console.log(exception.status + ', ' + exception.message)
            console.log(exception.status)
            if(localStorage.getItem('is-logged-in') != String(true)) {
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

    // intercept(
    //   request: HttpRequest<unknown>,
    //   next: HttpHandler
    // ): Observable<HttpEvent<unknown>> {
    //   return next.handle(request).pipe(
    //     catchError((error) => {
    //       console.log("Error interceptor works")
    //       if (error instanceof HttpErrorResponse) {
    //         if (error.error instanceof ErrorEvent) {
    //           console.log('Error Event');
    //         } else {
    //           switch (error.status) {
    //             case 403: // Forbidden
    //               this.router.navigate(['error/403']);
    //               break;
    //             case 404: // Not found
    //               this.router.navigate(['error/404']);
    //               break;
    //             default:
    //               this.router.navigate(['error/common']);
    //           }
    //         }
    //       } else {
    //         console.log('An error occurred');
    //       }
    //       return throwError(() => new Error(error.statusText));
    //     })
    //   );
    // }
  }
}
