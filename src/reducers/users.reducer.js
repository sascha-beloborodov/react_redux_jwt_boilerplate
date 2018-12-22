import {
  userConstants
} from '../constants/user.constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
        total: action.total,
        user: null
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GET_ONE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_ONE_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.GET_ONE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}