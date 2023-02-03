import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericStoreEffects, GenericStoreReducer, GenericStoreServices } from './_store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot(),
    StoreModule.forFeature('GenericStoreState', GenericStoreReducer),
    EffectsModule.forFeature(GenericStoreEffects),
  ],
  providers: [GenericStoreServices]
})
export class GenericStoreModule {}
