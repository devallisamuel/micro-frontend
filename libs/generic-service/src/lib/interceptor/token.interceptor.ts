import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '@hmo-src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public url = '';

  authToken = '';
  constructor(private auth: OidcSecurityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.startsWith(environment.apiServer)) {
      // Get the auth token from the service.
      this.authToken = this.auth.getToken();
      if (this.authToken != null) {
        // Clone the request and set the new header in one step.
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${this.authToken}` },
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
      }
    } else {
      const copiedReq = req.clone({
        withCredentials: false,
      });
      return next.handle(copiedReq);
    }
  }
}
