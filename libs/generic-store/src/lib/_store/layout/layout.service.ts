import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuInput, Menu } from './layout.interface';
import { NotificationActions } from '../notification';
import { State } from '../app-detail';
import { Configuration } from '@oriolaent-frontends/login';

@Injectable()
export class LayoutService extends BaseServiceV1 {
  constructor(
    protected _http: HttpClient,
    protected _configuration: Configuration,
    protected store: Store<State>
  ) {
    super(_http, _configuration, store);
    this.api = 'api';
  }
  public getMenu = (): Observable<MenuInput> => {
    this.store.dispatch(new NotificationActions.SetLoading('Menus'));
    return this.GetByParam3('General/GetMenus');
  };
}
