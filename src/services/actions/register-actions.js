import { API_URL } from "../../utils/url";
//import { useHistory } from 'react-router-dom';
import { setCookie } from "../../utils/cookie";
import { SET_IS_AUTH } from "./auth-actions";
import { SET_USER } from "./user-actions";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_REQUEST_SUCCESS = 'REGISTER_USER_REQUEST_SUCCESS';
export const REGISTER_USER_REQUEST_FAILED = 'REGISTER_USER_REQUEST_FAILED';

export function registerUserRequest(body) {
  return async function(dispatch) {
    //const history = useHistory();

    dispatch({type: REGISTER_USER_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/auth/register`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({type: REGISTER_USER_REQUEST_SUCCESS});
          document.cookie = setCookie('token', data.refreshToken);
          dispatch({ type: SET_IS_AUTH, accessToken: data.accessToken, tokenExp: 1200 });
          dispatch({ type: SET_USER, user: data.user});
        }  
      } else {
        throw new Error('Registration error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: REGISTER_USER_REQUEST_FAILED});
    }
  }
}