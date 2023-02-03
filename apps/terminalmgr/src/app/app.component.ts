
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userData: any;
  constructor(public oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      if (isAuthenticated) {
        this.userData = userData;
      } else {
        this.oidcSecurityService.authorize();
      }
    });
  }

  logout(message: string){
    console.log(message);
    this.oidcSecurityService.logoffAndRevokeTokens();
  }
}
