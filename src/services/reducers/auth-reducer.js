import {
  SET_IS_AUTH,
  RESET_IS_AUTH,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  REFRESH_TOKEN_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_REQUEST_SUCCESS,
  LOGIN_REQUEST_REQUEST_FAILED,
} from '../actions/auth-actions.js';

const initialState ={
  isAuth: false,

  refreshTokenRequest: false,
  refreshTokenRequestFailed: false,

  loginRequest: false,
  loginRequestFailed: false,
  fromLoginRedirect: false,

};

export function authReducer(state = initialState, action) {
  switch(action.type) {
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: true,
        accessToken: action.accessToken
      }
    }

    case RESET_IS_AUTH: {
      return {
        ...state,
        isAuth: false,
        fromLoginRedirect: false,
        accessToken: '',
      }
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      }
    }

    case REFRESH_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: false,
      }
    }

    case REFRESH_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      }
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }

    case LOGIN_REQUEST_REQUEST_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: false,
        fromLoginRedirect: true
      };
    }

    case LOGIN_REQUEST_REQUEST_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
      };
    }

    default: return { ...state };
  }
}