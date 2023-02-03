import {
  Component, OnInit, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnChanges, SimpleChanges,
} from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  Role, RolePermission, User, initRole, initRolePermission, initUserRole,
  UserMgtState, Securable, Permission,
  SecurableEntity, UserEntity
} from '../../redux';

import {
  textColorColourClass, btnColourClass, btnSmallColourClass, tabcolourClass
} from '../../../../general/general.selector';

// import { IOption } from '../../../..';
// import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
// import { StyledComponent, SaveDeleteComponent, HeaderComponent, newId } from 'shared';
// import { EmployeeLookup } from 'hr/redux';

interface UserData {
  id: string;
  roleId: string;
  userId: string;
  name: string;
  lastName: string;
  firstName: string;
  userName: string;
  email: string;
  admin: boolean;

}


@Component({
  selector: 'app-role-create',
  templateUrl: 'role.component-create.html',
  styleUrls: ['role.component-create.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoleCreateComponent {

}


