// import { Schema, arrayOf } from 'normalizr';
import {
  Role,
  RolePermission,
  UserRole,
  PermissionEnum,
  SecurablePermission,
  Securable,
  SecurableEnum,
} from './role.interface';

// export const RoleSchema = new Schema('Role', { idAttribute: 'id' });
// export const arrayOfRole = arrayOf(RoleSchema);

// export const SecurableSchema = new Schema('Securable', { idAttribute: 'id' });
// export const arrayOfSecurable = arrayOf(SecurableSchema);

export const initRole: Role = {
  id: '',
  name: '',
  users: [],
  permissions: [],
};

export const initRolePermission: RolePermission = {
  id: '',
  roleId: '',
  permission: -1,
  assigned: false,
  securableId: '',
};

export const initUserRole: UserRole = {
  id: '',
  roleId: '',
  userId: '',
};

export const initSecurable: Securable = {
  id: '',
  name: '',
  securedItem: SecurableEnum.Undefined,
  assignedPermissions: [],
};

export const initSecurablePermission: SecurablePermission = {
  id: '',
  permission: PermissionEnum.Undefined,
  assigned: false,
};

export interface RoleEntity {
  [id: string]: Role;
}

export interface SecurableEntity {
  [id: string]: Securable;
}
