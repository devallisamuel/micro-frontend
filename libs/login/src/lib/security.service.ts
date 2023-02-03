import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TokenActions, LoginActions } from './_store/actions';
import { UserModel, initUser, } from './_store/models';
import { Store } from '@ngrx/store';
import { OidcSecurityCommon } from './auth/oidc.security.common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { State } from '.';
import { AuthWellKnownEndpoints } from 'angular-auth-oidc-client';

@Injectable()
export class SecurityService {

  private actionUrl!: string;
  private storage: any;
  private returnUrl!: string;
  private idServerUrl!: string;
  // private _router: Router;
  private _useBackEnd!: boolean;
  private _isAuthorized!: boolean;
  public HasAdminRole!: boolean;
  public redirectUrl!: string;
  private clientId!: string;
  private scope!: string;
  private dataFolder!: string;
  public authenticated = false;
  public roles: any[] = [];
  public name = '';
  public companyId = '';
  public tenantId = '';
  public operatorId = '';
  public prompt = 'none';
  public userPermission = false;
  authWellKnownEndpoints!: AuthWellKnownEndpoints;
  responseType!: string;
  silentRenew = false;
  constructor(private ngrxStore: Store<State>,
    private oidcSecurityCommon: OidcSecurityCommon, private cookieService: CookieService,
    private authService: AuthService
  ) {

    this.ngrxStore.select(appState => appState.appDetails.configuration)
      .subscribe(_configuration => {
        this.actionUrl = _configuration.apiServer;
        this.returnUrl = _configuration.returnUrl;
        this.idServerUrl = _configuration.idServer;
        this._useBackEnd = _configuration.useBackend;
        this.clientId = _configuration.clientId;
        this.scope = _configuration.scope;
        this.prompt = _configuration.prompt;
        this.dataFolder = _configuration.data;
        this.userPermission = _configuration.userPermission;
        this.responseType = _configuration.responseType;

      });

    this.ngrxStore.select(appState => appState.appDetails.authWellKnownEndpoints)
      .subscribe(authWellKnownEndpoints => this.authWellKnownEndpoints = authWellKnownEndpoints);

    this.ngrxStore.select(appState => appState.appDetails.silentRenew)
      .subscribe(silentRenew => this.silentRenew = silentRenew);
    this.storage = sessionStorage;
  }

  public IsAuthorized(): boolean {
    if (this.authService.isLoggedIn) {
      this.store('_isAuthorized', true);
      this._isAuthorized = true;
      return true;
    }
    this.store('_isAuthorized', false);
    this._isAuthorized = false;
    return false;

  }

  public Authorize(requestedUrl: string) {
    console.log("ehy", "1>>>>>>>>>", requestedUrl);
    this.authService.doLogin();
  }

  public dispatchToStore() {
    this.ngrxStore.dispatch(new TokenActions.SetTokenAction({
      id: null, access: null, authenticated: false,
      retUrl: this.retrieve('RetUrl'),
      tokenDate: null,
      tokenTime: null
    }));

    const idToken = this.authService.tokenId;
    const token = this.authService.token;
    const tokenTime = 1800;
    const dataIdToken: any = this.getDataFromToken(token);
    const tokenExpirationDate = this.getTokenExpirationDate(dataIdToken);
    this.ngrxStore.dispatch(new TokenActions.SetTokenAction({
      id: idToken, access: token, authenticated: true,
      retUrl: this.retrieve('RetUrl'),
      tokenDate: tokenExpirationDate,
      tokenTime: tokenTime
    }));
    this.cookieService.set('token', token, tokenExpirationDate);

    if (this.oidcSecurityCommon.silentRenewRunning !== 'running') {
      const user: UserModel.User = _.assign({}, initUser, {
        authenticated: true, full_name: dataIdToken.full_name,
        given_name: dataIdToken.given_name, email: dataIdToken.email,
        name: dataIdToken.full_name,
        family_name: dataIdToken.family_name, branch: dataIdToken.branch,
        sub: dataIdToken.sub, role: dataIdToken.role, token: idToken, groups: [],
        roles: dataIdToken.roles, id: dataIdToken.sub,
        companyId: dataIdToken.companyId, tenantId: dataIdToken.tenantId,
        enrolleeId: dataIdToken.enrolleeId, enrolleeGroupId: dataIdToken.enrolleeGroupId,
        admin: (dataIdToken.admin === 'True') ? true : false,
        tokenDate: tokenExpirationDate,
        tokenTime: tokenExpirationDate?.valueOf() - (new Date().valueOf() * 1000),
      });
      this.ngrxStore.dispatch(new LoginActions.LoginSuccessAction(user));
    }
    this.name = dataIdToken.name;
    this.roles = dataIdToken.role;
  }
  public Logoff() {
    this.authService.signOut();
    const authorizationUrl = this.idServerUrl + 'connect/endsession';

    const idTokenHint = this.authService.token;
    const postLogoutRedirectUri = this.returnUrl + 'unauthorized';
    const url =
      authorizationUrl + '?' +
      'id_token_hint=' + encodeURI(idTokenHint) + '&' +
      'post_logout_redirect_uri=' + encodeURI(postLogoutRedirectUri);

    window.location.href = url;
  }

  private urlBase64Decode(str: any) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  private getDataFromToken(token: any) {
    let data = {};
    if (typeof token !== 'undefined') {
      const encoded = token.split('.')[1];
      data = JSON.parse(this.urlBase64Decode(encoded));
    }
    return data;
  }

  private retrieve(key: string): any {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(this.storage.getItem(key));
    }

    return;
  }

  private store(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  private getTokenExpirationDate(dataIdToken: any): Date {
    if (!dataIdToken.hasOwnProperty('exp')) {
      return new Date();
    }
  }
}
