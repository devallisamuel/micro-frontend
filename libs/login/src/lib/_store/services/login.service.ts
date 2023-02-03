
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Configuration, State } from '../..';


@Injectable()
export class LoginService extends BaseServiceV1 {


    constructor(
        protected _http: HttpClient,
        protected _configuration: Configuration,
        protected store: Store<State>
    ) {
        super(_http, _configuration, store);
        this.api = 'Role';
    }

    // public getUserPermissions = (userId: string): Observable<UserAssignedPermission[]> => {
    //     this.store.dispatch(new NotificationActions.SetLoading('Loading permissions'));
    //     const params = new HttpParams().set('id', userId);
    //     return this.GetByParam2(this.api + '/GetUserPermissions', params);
    // }

}
