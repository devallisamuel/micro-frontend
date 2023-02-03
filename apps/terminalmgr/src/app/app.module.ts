import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '@oriolaent-frontends/ui';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundamentalNgxCoreModule, FdDatetimeModule, RtlService } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
import { CommonModule } from '@angular/common';
import { AuthModule, LogLevel, OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FundamentalNgxCoreModule, FdDatetimeModule,
    FundamentalNgxPlatformModule,
    UIModule,
    HttpClientModule,
    CdkTableModule,
    DragDropModule,
    AuthModule.forRoot({
      config: {
        authority: environment.idServer,
        redirectUrl: environment.returnUrl,
        postLogoutRedirectUri: environment.returnUrl,
        clientId: environment.clientId,
        scope: environment.scope,
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [RtlService, OidcSecurityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
