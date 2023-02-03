export interface User {
  id: string;
  name: string;
  lastName: string;
  firstName: string;
  userName: string;
  email: string;
  admin: boolean;
  role: string;
  companyId: string;
  enrolleeId: string;
  tenantId: any;
  enrolleeGroupId: string;
  sub: any;
}

export interface UserPermission {
  id: string;
  userId: string;
  permission: number;
}
export interface UserPassword {
  userId: string;
  password: string;
}
