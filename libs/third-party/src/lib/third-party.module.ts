import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './angular-material/material.module';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FundamentalNgxCoreModule,
    FundamentalNgxPlatformModule
  ],
  exports: [
    MaterialModule,
    FundamentalNgxCoreModule,
    FundamentalNgxPlatformModule
  ],
})
export class ThirdPartyModule {}
