import { SecurableEnum, PermissionEnum } from '../../usermanagement/redux';

export interface User {
    tenantId: string;
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    sub: string;
    authenticated: boolean;
    role: string;
    token: string;
    full_name: string;
    groups: Group[];
    branch: string;
    admin: boolean;
    dept: string;
    showLevel: number;
    display: string;
    roles: string[];
    permissions: UserAssignedPermission[];
    tokenDate: Date;
    given_name: string;
    companyId: string;
    enrolleeId: string;
    enrolleeGroupId: string;

}

export interface Token {
    id: string;
    access: string;
    authenticated: boolean;
    retUrl: string;
    tokenDate: Date;
    tokenTime: number;
}

export interface UserAssignedPermission {
    userId: string;
    roleId: string;
    companyId: string;
    enrolleeId: string;
    securedItem: SecurableEnum;
    permission: PermissionEnum;
    assigned: boolean;
    securableId: string;
    tenantId: string;
}

export interface Group {
    id: string;
    name: string;
    user: User[];
}

export const initUser: User = {
    id: '',
    email: '',
    name: '',
    firstName: '',
    lastName: '',
    sub: '',
    authenticated: false,
    role: '',
    token: '',
    full_name: '',
    groups: [],
    branch: '',
    dept: '',
    showLevel: 1,
    display: 'ihm',
    roles: [],
    permissions: [],
    admin: false,
    tokenDate: new Date(),
    given_name: '',
    companyId: '',
    enrolleeId: '',
    tenantId: '',
    enrolleeGroupId: ''
};

export const initToken: Token = {
    id: '',
    access: '',
    authenticated: false,
    retUrl: '',
    tokenDate: new Date(),
    tokenTime: 0
};

export const initAssignedPermission: UserAssignedPermission = {
    userId: '',
    roleId: '',
    companyId: '',
    enrolleeId: '',
    tenantId: '',
    permission: -1,
    securedItem: -1,
    assigned: false,
    securableId: ''
};

