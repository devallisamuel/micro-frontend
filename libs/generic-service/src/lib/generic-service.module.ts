import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule,HttpClientModule],
})
export class GenericServiceModule {

  public static forRoot(value: any): ModuleWithProviders<GenericServiceModule> {
    const {environment} = value
    return {
        ngModule: GenericServiceModule,
        providers: [
            {
                provide: 'env', // you can also use InjectionToken
                useValue: environment
            }
        ]
    };

  }
}
