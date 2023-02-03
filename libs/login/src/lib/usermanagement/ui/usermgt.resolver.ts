import { Injectable } from '@angular/core';

import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../core';
import { RoleActions, UserActions } from '../redux';

@Injectable()
export class UserMgtResolver {

  constructor(private router: Router, private store: Store<State>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Boolean {
    this.store.dispatch(new RoleActions.LoadItemsAction(''));
    this.store.dispatch(new UserActions.LoadItemsAction(''));
    return true;
  }

}
