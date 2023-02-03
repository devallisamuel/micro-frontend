import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad, Route
} from '@angular/router';
import { SecurityService } from './security.service';

import { Observable } from 'rxjs';
import { UserAssignedPermission, getUserPermissions, getUser, getAuthenticated, State } from '.';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  userPermissions: UserAssignedPermission[] = [];
  menus: Menu[] = [];
  admin = false;
  authenticated$: Observable<boolean>;
  authenticated = false;
  constructor(private securityService: SecurityService, private router: Router,
    private store: Store<State>
  ) {
    this.store.select(getUserPermissions)
      .subscribe(perms => {
        this.userPermissions = perms;
      });
    this.store.select(Menus)
      .subscribe(menus => {
        if (menus) { this.menus = menus; }
      });
    this.store.select(getUser)
      .subscribe(user => {
        this.admin = user.admin;
      });
    this.store.select(getAuthenticated)
      .subscribe(authenticated => this.authenticated = authenticated);

  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log('get here', url);
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log('url>>>>>>>', url);
    if (this.securityService.IsAuthorized()) {
      return true;
    } else {
      // Store the attempted URL for redirecting
      this.securityService.redirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
      return false;
    }
  }
  // checkLogin(url: string): boolean {


  //   if (!this.authenticated) {
  //     // Store the attempted URL for redirecting
  //     this.securityService.Authorize(url);
  //     return false;
  //   }

  //   if (this.admin) {
  //     return true;
  //   }
  //   if (url === '/') {
  //     return true;
  //   }
  //   const menu: Menu = this.menus.filter(m => url.startsWith(m.route))[0];
  //   if (!menu) {
  //     return false;
  //   }
  //   const secs: boolean[] = [];
  //   if (menu.securables.length > 0) {
  //     this.userPermissions.map(perm => {
  //       const index = menu.securables.findIndex(p => p.securable === perm.securedItem);
  //       secs.push(index !== -1 ? true : false);
  //     });
  //   }
  //   if (secs.indexOf(true) === -1) {
  //     this.store.dispatch(
  //       new NotificationActions.Unauthorised('You are unauthorised to view ' + menu.name));
  //     return false;
  //   } else {
  //     return true;
  //   }



  // }
}
