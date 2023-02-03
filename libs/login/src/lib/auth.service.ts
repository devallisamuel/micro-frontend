import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}
  loggedIn: boolean;


  get isLoggedIn() {
   this.oidcSecurityService.isAuthenticated$.subscribe(res => {
     this.returnValue(res);
   });
   return this.loggedIn;
  }

  returnValue(val) {
    this.loggedIn = val;
  }

  get refreshToken() {
    return this.oidcSecurityService.getRefreshToken();
  }

  refreshSession() {
    return this.oidcSecurityService.forceRefreshSession();
  }

  get token() {
    return this.oidcSecurityService.getIdToken();
  }

  get tokenId() {
    return this.oidcSecurityService.getIdToken();
  }

  get userData() {
    return this.oidcSecurityService.userData$;
  }

  checkAuth() {
    return this.oidcSecurityService.checkAuth();
  }

  doLogin() {
    return of(this.oidcSecurityService.authorize());
  }

  signOut() {
    this.oidcSecurityService.logoffAndRevokeTokens();
  }
}
