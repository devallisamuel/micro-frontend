import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OndgoSharedModule } from '../../..';

import {
    RoleEffects, UserEffects,
    UserMgtReducer, UserService, RoleService
} from '../redux';

import { UserMgtRoutingModule } from './usermgt.routing.module';
import { UserMgtComponent } from './usermgt.component';
import { RoleComponent } from './role/role.component';
import {UserComponent } from './user/user.component';
import { RoleCreateComponent } from './role/role.component-create';
import {UserCreateComponent } from './user/user-create.component';
@NgModule({
    imports: [
        CommonModule,
        OndgoSharedModule,
        UserMgtRoutingModule,
        StoreModule.forFeature('UserMgt', UserMgtReducer),
        EffectsModule.forFeature([RoleEffects, UserEffects])
    ],
    exports: [UserMgtComponent,
        RoleComponent, RoleCreateComponent, UserCreateComponent, UserComponent],
    declarations: [UserMgtComponent,
        RoleComponent, RoleCreateComponent, UserComponent, UserCreateComponent],
    providers: [UserService, RoleService],
})
export class UserMgtModule { }
