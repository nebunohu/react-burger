import { AppDispatch, AppThunk } from "../../types";
import { API_URL } from "../../utils/url";
import { SET_IS_AUTH } from "./auth-actions";
import { refreshToken } from "../../utils/token";

export const SET_USER: "SET_USER" = "SET_USER";
export const RESET_USER: 'RESET_USER' = 'RESET_USER';
export const GET_USER_REQUEST:"GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_REQUEST_SUCCESS: "GET_USER_REQUEST_SUCCESS" = "GET_USER_REQUEST_SUCCESS";
export const GET_USER_REQUEST_FAILED: "GET_USER_REQUEST_FAILED" = "GET_USER_REQUEST_FAILED";

export const EDIT_USER_REQUEST: "EDIT_USER_REQUEST" = "EDIT_USER_REQUEST";
export const EDIT_USER_REQUEST_SUCCESS: "EDIT_USER_REQUEST_SUCCESS" = "EDIT_USER_REQUEST_SUCCESS";
export const EDIT_USER_REQUEST_FAILED: "EDIT_USER_REQUEST_FAILED" = "EDIT_USER_REQUEST_FAILED";

export const SET_IS_USER_LOADED: 'SET_IS_USER_LOADED' = 'SET_IS_USER_LOADED';
export const RESET_IS_USER_LOADED: 'RESET_IS_USER_LOADED' = 'RESET_IS_USER_LOADED';

export interface ISetUser {
  readonly type: typeof SET_USER;
  readonly user: {name: string, email: string};
};

export interface IResetUser {
  readonly type: typeof RESET_USER;
};

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
};

export interface IGetUserRequestSuccess {
  readonly type: typeof GET_USER_REQUEST_SUCCESS;
};

export interface IGetUserRequestFailed {
  readonly type: typeof GET_USER_REQUEST_FAILED;
};

export interface IEditUserRequest {
  readonly type: typeof EDIT_USER_REQUEST;
};

export interface IEditUserRequestSuccess {
  readonly type: typeof EDIT_USER_REQUEST_SUCCESS;
};

export interface IEditUserRequestFailed {
  readonly type: typeof EDIT_USER_REQUEST_FAILED;
};

export interface ISetIsUserLoaded {
  readonly type: typeof SET_IS_USER_LOADED;
};

export interface IResetIsUserLoaded {
  readonly type: typeof RESET_IS_USER_LOADED;
};

export type TUserActions = ISetUser | 
  IResetUser | 
  IGetUserRequest |
  IGetUserRequestSuccess |
  IGetUserRequestFailed |
  IEditUserRequest |
  IEditUserRequestSuccess |
  IEditUserRequestFailed |
  ISetIsUserLoaded |
  IResetIsUserLoaded;

  export const getUser: AppThunk = (token) => async (dispatch: AppDispatch) => {
    dispatch({type: GET_USER_REQUEST});
    try {
      const headers = new Headers({
        "content-type": "application/json",
        "authorization": token});
      const res = await fetch(`${API_URL}/auth/user`, {method: 'GET', mode: 'cors', headers});
      const data = await res.json();
      //if (res.ok) {
        
        if(data.success) {
          dispatch({type: GET_USER_REQUEST_SUCCESS});
          dispatch({ type: SET_USER, user: data.user});
          dispatch({ type: SET_IS_AUTH });
        } else {
          
          if (data.message === 'jwt expired' || data.message === 'invalid token') {
            if(await refreshToken()) {
              const res = await fetch(`${API_URL}/auth/user`, {method: 'GET', mode: 'cors', headers});
    
              const data = await res.json();
              if(data.success) {
                //setBurger({...burger, name: data.name});
                dispatch({type: GET_USER_REQUEST_SUCCESS});
                dispatch({ type: SET_USER, user: data.user});
                dispatch({ type: SET_IS_AUTH });
              }
            }
          
          } else {
            throw new Error('Get user fetch error');
          }
        }
      //} else {
      //  throw new Error('Get user failed')
      //}
    } catch(e) {
      dispatch({type: GET_USER_REQUEST_FAILED});
      console.log(e);
    }
  }

export const editUser: AppThunk = (body, token) => async (dispatch: AppDispatch) => {
    dispatch({type: GET_USER_REQUEST});
    try {
      const headers = new Headers({
        "content-type": "application/json",
        "authorization": token});
      const res = await fetch(`${API_URL}/auth/user`, {method: 'PATCH', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({type: GET_USER_REQUEST_SUCCESS});
          dispatch({ type: SET_USER, user: data.user});
        }
      } else {
        throw new Error('Edit user failed')
      }
    } catch(e) {
      dispatch({type: GET_USER_REQUEST_FAILED});
      console.log(e);
    }
  }
