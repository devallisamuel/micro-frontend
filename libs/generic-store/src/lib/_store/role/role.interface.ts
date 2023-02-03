export interface Role {
  id: string;
  name: string;
  users: UserRole[];
  permissions: RolePermission[];
}

export interface UserRole {
  id: string;
  roleId: string;
  userId: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permission: PermissionEnum;
  assigned: boolean;
  securableId: string;
}

export interface Securable {
  id: string;
  name: string;
  securedItem: SecurableEnum;
  assignedPermissions: SecurablePermission[];
}

export interface SecurablePermission {
  id: string;
  permission: PermissionEnum;
  assigned: boolean;
}

export enum SecurableEnum {
  Undefined = -1,
  Patients = 0,
}

export enum PermissionEnum {
  Undefined = -1,
  Add = 0,
  Update = 1,
  Remove = 2,
  View = 3,
  Assign = 4,
  Workflow = 5,
}

export interface Permission {
  permission: PermissionEnum;
  name: string;
}
export interface SecurableItem {
  securable: SecurableEnum;
  name: string;
}
