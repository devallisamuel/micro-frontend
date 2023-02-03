import * as _ from 'lodash';
import { UserModel } from '@chm-core/_interfaces';
import { TokenActions } from '.';

type Action = TokenActions.AllActions;

export function TokenReducer(
  state: UserModel.Token = UserModel.initToken,
  action: Action
): UserModel.Token {
  switch (action.type) {
    case TokenActions.SET_TOKEN:
      return _.assign({}, state, action.payload);
    case TokenActions.INIT_TOKEN:
      return UserModel.initToken;
    case TokenActions.GET_URL_SUCCESS:
      return _.assign({}, state, { retUrl: action.payload });
    case TokenActions.SET_URL:
      return _.assign({}, state, { retUrl: action.payload });
    default:
      return state;
  }
}
