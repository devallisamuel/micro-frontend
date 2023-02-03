import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellbarUIComponent } from './shellbar-ui/shellbar-ui.component';
import { FundamentalNgxCoreModule, FdDatetimeModule, RtlService } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FundamentalNgxCoreModule, FdDatetimeModule,
    FundamentalNgxPlatformModule,
    HttpClientModule,
    CdkTableModule,
    DragDropModule,
  ],
  declarations: [ShellbarUIComponent],
  exports: [ShellbarUIComponent],
  providers: [RtlService, OidcSecurityService],
})
export class UIModule {}
