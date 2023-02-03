import { User, UserPassword } from './user.interface';

export const UserSchema = new Schema('User', { idAttribute: 'id' });
export const arrayOfUser = arrayOf(UserSchema);

export const initUser: User = {
    id: null,
    name: '',
    lastName: '',
    firstName: '',
    email: '',
    userName: '',
    admin: false,
    role: '',
    companyId: '',
    enrolleeId: '',
    tenantId: '',
    enrolleeGroupId: '',
    sub: null
};
export const initUserPassword: UserPassword = {
  userId: '',
  password: ''

};
export interface UserEntity {
    [id: string]: User;
}
