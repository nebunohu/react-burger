import {
  SET_USER,
  RESET_USER,
  GET_USER_REQUEST,
  GET_USER_REQUEST_SUCCESS,
  GET_USER_REQUEST_FAILED,
  SET_IS_USER_LOADED,
  RESET_IS_USER_LOADED, 
  TUserActions
 } from '../actions/user-actions';

 export type TUserState = {
  getUserRequest: boolean;
  getUserRequestFailed: boolean;
  isUserLoaded: boolean;
  name: string;
  email: string;
};

const initialState: TUserState = {
  getUserRequest: false,
  getUserRequestFailed: false,
  isUserLoaded: false,
  name: '',
  email: ''
};

export function userReducer(state = initialState, action: TUserActions): TUserState {
  switch(action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.user
      }
    }

    case RESET_USER: {
      return {
        ...state,
        name: '',
        email: '',
        isUserLoaded: false
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state, 
        getUserRequest: true,
      }
    }

    case GET_USER_REQUEST_SUCCESS: {
      return {
        ...state, 
        getUserRequest: false,
        getUserRequestFailed: false,
        isUserLoaded: true,
      }
    }

    case GET_USER_REQUEST_FAILED: {
      return {
        ...state, 
        getUserRequest: false,
        getUserRequestFailed: true
      }
    }

    case SET_IS_USER_LOADED: {
      return {
        ...state,
        isUserLoaded: true,
      }
    }

    case RESET_IS_USER_LOADED: {
      return {
        ...state,
        isUserLoaded: false,
      }
    }

    default: return state;
  }
}