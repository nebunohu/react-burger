import { API_URL } from "../../utils/url";
import { setCookie } from "../../utils/cookie";

import { SET_USER, RESET_USER } from "./user-actions";

export const SET_IS_AUTH = "SET_IS_AUTH";
export const RESET_IS_AUTH = "RESET_IS_AUTH";

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_REQUEST_SUCCESS = 'REFRESH_TOKEN_REQUEST_SUCCESS';
export const REFRESH_TOKEN_REQUEST_FAILED = 'REFRESH_TOKEN_REQUEST_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_REQUEST_SUCCESS = 'LOGIN_REQUEST_REQUEST_SUCCESS';
export const LOGIN_REQUEST_REQUEST_FAILED = 'LOGIN_REQUEST_REQUEST_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_REQUEST_SUCCESS = 'LOGOUT_REQUEST_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_REQUEST_FAILED = 'LOGOUT_REQUEST_REQUEST_FAILED';

export function refreshToken(body) {
  return async function (dispatch) {
    try {
      dispatch({ type: REFRESH_TOKEN_REQUEST });
      const headers = new Headers({
        "content-type": 'application/json',

      });

      const res = await fetch(`${API_URL}/auth/token`, { method: 'POST', mode: 'cors', headers, body: JSON.stringify(body) });
      /*  .then(res => res.json())
        .then(data => {
          if (data.success) {
            dispatch({ type: REFRESH_TOKEN_REQUEST_SUCCESS });
            document.cookie = setCookie('token', data.refreshToken);
            dispatch({ type: SET_IS_AUTH, accessToken: data.accessToken });
          } else {
            throw new Error(data.message);
          }
        });*/
      const data = await res.json();
      if (data.success) {
        dispatch({ type: REFRESH_TOKEN_REQUEST_SUCCESS });
        document.cookie = setCookie('token', data.refreshToken);
        dispatch({ type: SET_IS_AUTH, accessToken: data.accessToken });
      } else {
        throw new Error(data.message);
      }

    } catch( e ) {
      dispatch({ type: REFRESH_TOKEN_REQUEST_FAILED });
      console.log( e );
    }
  }
}

export function loginRequest(body) {
  return async function(dispatch) {
    //const history = useHistory();

    dispatch({type: LOGIN_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/auth/login`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({ type: LOGIN_REQUEST_REQUEST_SUCCESS });
          document.cookie = setCookie('token', data.refreshToken);
          dispatch({ type: SET_IS_AUTH, accessToken: data.accessToken });
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
}

export function logoutRequest(body) {
  return async function(dispatch) {
    //const history = useHistory();

    dispatch({type: LOGOUT_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/auth/logout`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({ type: LOGOUT_REQUEST_REQUEST_SUCCESS });
          document.cookie = '';
          dispatch({ type: RESET_IS_AUTH });
          dispatch({ type: RESET_USER });
        }  
      } else {
        throw new Error('Login error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: LOGOUT_REQUEST_REQUEST_FAILED});
    }
  }
}