import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { IOption } from '../../../..';
import {
    BaseComponent, DialogService, DisplayModeEnum,
} from '../../../..';
import {
    borderColourClass, agClass
} from '../../../../general/general.selector';

import {
    UserMgtState, RoleActions, Role, SecurableEntity,
    Permission, SecurableItem, Securable, UserSelector, UserEntity
} from '../../redux';

import * as RoleSelector from '../../redux/role/role.selector';

@Component({
    selector: 'app-role',
    templateUrl: 'role.component.html',
    styleUrls: ['role.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoleComponent extends BaseComponent implements OnInit {
    public roles$: Observable<Role[]>;
    agTheme$: Observable<string>;
    public role$: Observable<Role>;
    public permissions$: Observable<Permission[]>;
    public securableItems$: Observable<SecurableItem[]>;
    public securables$: Observable<Securable[]>;
    public secEntity$: Observable<SecurableEntity>;
    // public secLookup$: Observable<IOption[]>;
    // public userLookup$: Observable<IOption[]>;
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

        this.roles$ = this.store.select(RoleSelector.getRoleCollection);
        this.role$ = this.store.select(RoleSelector.selectedRole);
        this.permissions$ = this.store.select(RoleSelector.permissions);
        this.securableItems$ = this.store.select(RoleSelector.securables);
        this.secEntity$ = this.store.select(RoleSelector.SecurableEntities);
        this.securables$ = this.store.select(RoleSelector.getSecurableCollection);
        // this.secLookup$ = this.store.select(RoleSelector.getSecurableLookup);
        // this.userLookup$ = this.store.select(UserSelector.getUserLookup);
        this.userEntity$ = this.store.select(UserSelector.UserEntities);

    }

    add(data: any) {
        console.log(JSON.stringify(data));
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
}
