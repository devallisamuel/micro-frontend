import { UserModel } from 'libs/login/src/lib';
import * as _ from 'lodash';
import * as LoginActions from './login.action';

export function LoginReducer(
  state: UserModel.User = UserModel.initUser,
  action: LoginActions.Actions
) {
  switch (action.type) {
    case LoginActions.LOGIN:
      return state;
    case LoginActions.LOGIN_SUCCESS: {
      const newUser: UserModel.User = _.assign({}, action.payload);
      return newUser;
    }
    case LoginActions.LOGOUT:
      return UserModel.initUser;
    case LoginActions.SELECT_OPERATOR:
      return _.assign({}, state, { operatorId: action.payload });
    case LoginActions.SELECT_DISPLAY:
      return _.assign({}, state, { display: action.payload });

    default:
      return state;
  }
}

function setUser(roles: string[]) {
  const ret = {};
  return ret;
}

export const getDept = (state: UserModel.User) => state.dept;
export const getFname = (state: UserModel.User) => state.firstName;
export const getName = (state: UserModel.User) => state.full_name;
export const getLevel = (state: UserModel.User) => state.showLevel;
export const getDisplay = (state: UserModel.User) => state.display;
export const getRole = (state: UserModel.User) => state.role;
export const getCompanyId = (state: UserModel.User) => state.companyId;
export const getEnrolleeId = (state: UserModel.User) => state.enrolleeId;
export const getTenantId = (state: UserModel.User) => state.tenantId;
export const getSub = (state: UserModel.User) => state.sub;
