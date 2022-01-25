import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JWTToken} from 'src/types';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private jwtHelperService: JwtHelperService,
  ) {
  }

  // Directly get the user, because isAdmin is set too late
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.jwtHelperService.decodeToken<JWTToken>(localStorage.getItem(this.userService.ACCESS_TOKEN_KEY) ?? "")

    return this.userService.getUser(token.user_id).pipe(
      map(user => {

        const isAdmin = user.is_superuser || user.is_staff

        // console.log({ admin: user });

        // const isAdmin = isAdmin?.is_superuser || isAdmin?.is_staff
        // console.log({ isAdmin })

        // Maybe route to unauthorized page, but not found is also fine
        if (!isAdmin)
          this.router.navigate(['**'], {skipLocationChange: true})

        return isAdmin;
      })
    );
  }

}
