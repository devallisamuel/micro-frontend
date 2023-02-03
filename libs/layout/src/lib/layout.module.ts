import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // Added
import { MaterialModule } from '@oriolaent-frontends/third-party';
import { NavbarComponent } from './pages/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class LayoutModule {}
