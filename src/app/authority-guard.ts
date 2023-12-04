import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorityGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (localStorage.getItem('is-logged-in') != String(true)) { //if not logged
      this.router.navigate(['login']);
      return false;
    }
    if (localStorage.getItem('is-logged-in') === String(true)) { //if user don't have required role
      const userRole = localStorage.getItem('role');

      if (route.data["roles"] && route.data["roles"].indexOf(userRole) === -1) {
        this.router.navigate(['error/403']);
      }
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
