import { PreloadingStrategy, Route } from '@angular/router';

import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load(route.data.delay) : of(null);
  }
}
