import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification/notification.component';
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule],
  declarations: [NotificationComponent],
})
export class AppUtilModule {}
