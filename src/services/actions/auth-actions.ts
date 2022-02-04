import { API_URL } from "../../utils/url";

import { SET_USER, RESET_USER } from "./user-actions";
import { AppDispatch, AppThunk } from "../../types";

export const SET_IS_AUTH: "SET_IS_AUTH" = "SET_IS_AUTH";
export const RESET_IS_AUTH: "RESET_IS_AUTH" = "RESET_IS_AUTH";

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_REQUEST_SUCCESS: 'REFRESH_TOKEN_REQUEST_SUCCESS' = 'REFRESH_TOKEN_REQUEST_SUCCESS';
export const REFRESH_TOKEN_REQUEST_FAILED: 'REFRESH_TOKEN_REQUEST_FAILED' = 'REFRESH_TOKEN_REQUEST_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_REQUEST_SUCCESS: 'LOGIN_REQUEST_REQUEST_SUCCESS' = 'LOGIN_REQUEST_REQUEST_SUCCESS';
export const LOGIN_REQUEST_REQUEST_FAILED: 'LOGIN_REQUEST_REQUEST_FAILED' = 'LOGIN_REQUEST_REQUEST_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_REQUEST_SUCCESS: 'LOGOUT_REQUEST_REQUEST_SUCCESS' = 'LOGOUT_REQUEST_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_REQUEST_FAILED: 'LOGOUT_REQUEST_REQUEST_FAILED' = 'LOGOUT_REQUEST_REQUEST_FAILED';

export interface ISetIsAuth {
  readonly type: typeof SET_IS_AUTH;
};

export interface IResetIsAuth {
  readonly type: typeof RESET_IS_AUTH;
};

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
};

export interface IRefreshTokenRequestSuccess {
  readonly type: typeof REFRESH_TOKEN_REQUEST_SUCCESS;
};

export interface IRefreshTokenRequestFailed {
  readonly type: typeof REFRESH_TOKEN_REQUEST_FAILED;
};

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
};

export interface ILoginRequestSuccess {
  readonly type: typeof LOGIN_REQUEST_REQUEST_SUCCESS;
};

export interface ILoginRequestFailed {
  readonly type: typeof LOGIN_REQUEST_REQUEST_FAILED;
};

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
};

export interface ILogoutRequestSuccess {
  readonly type: typeof LOGOUT_REQUEST_REQUEST_SUCCESS;
};

export interface ILogoutRequestFailed {
  readonly type: typeof LOGOUT_REQUEST_REQUEST_FAILED;
};

export type TAuthActions = ISetIsAuth |
  IResetIsAuth |
  IRefreshTokenRequest |
  IRefreshTokenRequestSuccess |
  IRefreshTokenRequestFailed |
  ILoginRequest |
  ILoginRequestSuccess |
  ILoginRequestFailed |
  ILogoutRequest |
  ILogoutRequestSuccess |
  ILogoutRequestFailed;

/*export const refreshToken: AppThunk = (body) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: REFRESH_TOKEN_REQUEST });
      const headers = new Headers({
        "content-type": 'application/json',

      });

      const res = await fetch(`${API_URL}/auth/token`, { method: 'POST', mode: 'cors', headers, body: JSON.stringify(body) });

      const data = await res.json();
      if (data.success) {
        dispatch({ type: REFRESH_TOKEN_REQUEST_SUCCESS });
        //setCookie('token', data.refreshToken, {'path': '/'});
        localStorage.setItem('token', data.refreshToken);
        dispatch({ type: SET_IS_AUTH, accessToken: data.accessToken });
      } else {
        throw new Error(data.message);
      }

    } catch( e ) {
      dispatch({ type: REFRESH_TOKEN_REQUEST_FAILED });
      console.log( e );
    }
  }*/
export const checkAuth: AppThunk = () => async (dispatch: AppDispatch) => {
  if(localStorage.getItem('refreshToken')) dispatch({type: SET_IS_AUTH});
}

export const loginRequest: AppThunk = (body) => async (dispatch: AppDispatch) => {

    dispatch({type: LOGIN_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/auth/login`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('accessToken', data.accessToken);
          dispatch({type: LOGIN_REQUEST_REQUEST_SUCCESS});
          dispatch({ type: SET_IS_AUTH });
          dispatch({ type: SET_USER, user: data.user});
        }  
      } else {
        throw new Error('Login error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: LOGIN_REQUEST_REQUEST_FAILED});
    }
  }


export const logoutRequest: AppThunk = (body) => async (dispatch: AppDispatch) => {

    dispatch({type: LOGOUT_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/auth/logout`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({ type: LOGOUT_REQUEST_REQUEST_SUCCESS });
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({ type: RESET_IS_AUTH });
          dispatch({ type: RESET_USER });
        }  
      } else {
        throw new Error('Logout error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: LOGOUT_REQUEST_REQUEST_FAILED});
    }
  }
