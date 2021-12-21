import { API_URL } from "../../utils/url";

export const SET_USER = "SET_USER";
export const RESET_USER = 'RESET_USER';
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_REQUEST_SUCCESS = "GET_USER_REQUEST_SUCCESS";
export const GET_USER_REQUEST_FAILED = "GET_USER_REQUEST_FAILED";

export const EDIT_USER_REQUEST = "EDIT_USER_REQUEST";
export const EDIT_USER_REQUEST_SUCCESS = "EDIT_USER_REQUEST_SUCCESS";
export const EDIT_USER_REQUEST_FAILED = "EDIT_USER_REQUEST_FAILED";

export const SET_IS_USER_LOADED = 'SET_IS_USER_LOADED';
export const RESET_IS_USER_LOADED = 'RESET_IS_USER_LOADED';

export function getUser(token) {
  return async function(dispatch) {
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
        } else {
          throw new Error(data.message);
        }
      //} else {
      //  throw new Error('Get user failed')
      //}
    } catch(e) {
      dispatch({type: GET_USER_REQUEST_FAILED});
      console.log(e);
    }
  }
}

export function editUser(body, token) {
  return async function(dispatch) {
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
}