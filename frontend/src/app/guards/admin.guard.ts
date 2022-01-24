import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  // TODO: Not working, because isAdmin is set too late
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isAdmin.pipe(
      map(isAdmin => {

        console.log({ admin: isAdmin });

        // if (!isAdmin)
        //   return false

        // const isAdmin = isAdmin?.is_superuser || isAdmin?.is_staff
        // console.log({ isAdmin })

        // Maybe route to unauthorized page, but not found is also fine
        if (!isAdmin)
          this.router.navigate(['**'], { skipLocationChange: true })

        return isAdmin;
      })
    );
  }

}
