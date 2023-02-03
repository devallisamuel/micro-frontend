import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { User, UserPassword } from './user.interface';
import { Configuration } from '../../utilities/app.constants';
import { NotificationActions } from '../notification';

@Injectable()
export class UserService extends BaseServiceV1 {
    api: any;


    constructor(
        protected _http: HttpClient,
        protected _configuration: Configuration, protected store: Store<State>
    ) {
        super(_http, _configuration, store);
        this.api = 'User';
    }

    public getUsers = (): Observable<User[]> => {
        this.store.dispatch(new NotificationActions.SetLoading('Loading data'));
        return this.Get(this.api);
    }

    public addUser = (data: User): Observable<User> => {
        return this.add(data, this.api + '/Add');
    }

    public updateUser = (data: User): Observable<User> => {
        return this.update(data, this.api + '/update');
    }
    public deleteItem = (id: string): Observable<string> => {
        return this.delete(id, this.api);
    }
    public changeUserName = (data: User): Observable<User> => {
        return this.update(data, this.api + '/ChangeUserName');
    }
    public changePassword = (data: UserPassword): Observable<User> => {
        return this.update(data, this.api + '/ResetPassword');
    }
}
