import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  BaseComponent, DialogService, DisplayModeEnum,
} from '../../../..';
import {
  borderColourClass, agClass
} from '../../../../general/general.selector';

import {
  UserMgtState, RoleActions, User,
  UserSelector, UserEntity
} from '../../redux';
import { UserActions } from '../../redux/user';


@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent extends BaseComponent implements OnInit {
  public users$: Observable<User[]>;
  agTheme$: Observable<string>;
  public userEntity$: Observable<UserEntity>;
  btnClass$: Observable<string>;
  btnSmallClass$: Observable<string>;
  borderColourClass$: Observable<Object>;
  constructor(
    private store: Store<UserMgtState>,
    private dialogService: DialogService, private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.title = 'Roles';
    this.displayMode = DisplayModeEnum.Create;
    this.agTheme$ = this.store.select(agClass);
    this.borderColourClass$ = this.store.select(borderColourClass);
    this.users$ = this.store.select(UserSelector.getUserCollection);
    this.userEntity$ = this.store.select(UserSelector.UserEntities);
    console.log(this.changePassword);
  }

  add(data: any) {
    this.store.dispatch(new RoleActions.AddItemAction(data));
  }

  update(data: any) {
    this.store.dispatch(new RoleActions.UpdateItemAction(data));
  }

  edit(id: string) {
    this.store.dispatch(new RoleActions.SelectItemAction(id));
  }

  delete() {
    this.store.dispatch(new RoleActions.DeleteItemAction(''));
  }

  select(id: string) {
    this.store.dispatch(new RoleActions.SelectItemAction(id));
  }

  changePassword(data: any) {

    this.store.dispatch(new UserActions.PasswordChange(data));
  }
  changeUserName(data: any) {
    console.log(data);
    this.store.dispatch(new UserActions.UserChange(data));
  }
}
