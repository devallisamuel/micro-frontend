import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginEffects, reducers, LoginService } from './_store';
import { SecurityService, CanDeactivateGuard } from '.';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout/logout.component';

import { LoggerService, OidcSecuritySilentRenew, IFrameService } from './auth';
import { OidcSecurityCommon } from './auth/oidc.security.common';
import { OidcSecurityStorage, BrowserStorage } from './auth/oidc.security.storage';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationComponent } from './authorization/authorization.component';
// import { UserMgtModule } from './usermanagement/ui/usermgt.module';




@NgModule({
    imports: [
        StoreModule.forFeature('login', reducers),
        EffectsModule.forRoot([LoginEffects])
    ],
    exports: [LoginComponent,
        LogoutComponent,
    ],
    declarations: [LoginComponent, LogoutComponent, AuthorizationComponent],
    providers: [SecurityService, CanDeactivateGuard, LoginService, LoggerService
        , OidcSecuritySilentRenew, IFrameService, CookieService,
        OidcSecurityCommon, {
            provide: OidcSecurityStorage,
            useClass: BrowserStorage,
        }],
})
export class LoginModule { }

export interface Type<T> extends Function {
    new(...args: any[]): T;
}

export interface Token {
    access: any;
    storage?: Type<any>;
}
