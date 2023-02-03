import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Role } from './role.interface';
import { BaseServiceV1 } from '@hmo-core/_services';
import { Configuration } from '@hmo-core/utilities/app.constants';
import { NotificationActions } from '../notification';
import { State } from '../app-detail';

@Injectable()
export class RoleService extends BaseServiceV1 {
  constructor(
    protected _http: HttpClient,
    protected _configuration: Configuration,
    protected store: Store<State>
  ) {
    super(_http, _configuration, store);
    this.api = 'Role';
  }

  public getRoles = (): Observable<Role[]> => {
    const selectedCode = localStorage.getItem('programCode');
    const params = new HttpParams().set('program', selectedCode);
    this.store.dispatch(new NotificationActions.SetLoading('Loading data'));
    return this.GetByParam2(this.api, params);
  };

  public addRole = (data: Role): Observable<Role> => {
    const selectedCode = localStorage.getItem('programCode');
    const params = new HttpParams().set('program', selectedCode);
    return this.addByParam(data, this.api + '/Add', params);
  };

  public updateRole = (data: Role): Observable<Role> => {
    const selectedCode = localStorage.getItem('programCode');
    const params = new HttpParams().set('program', selectedCode);
    return this.updateByParam(data, this.api + '/update', params);
  };
  public deleteItem = (id: string): Observable<string> => {
    const selectedCode = localStorage.getItem('programCode');
    const params = new HttpParams().set('program', selectedCode);
    return this.deleteByParam(id, this.api, params);
  };
}
