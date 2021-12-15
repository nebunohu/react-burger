import { API_URL } from "../../utils/url";
//import { useHistory } from 'react-router-dom';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_REQUEST_SUCCESS = 'LOGIN_REQUEST_REQUEST_SUCCESS';
export const LOGIN_REQUEST_REQUEST_FAILED = 'LOGIN_REQUEST_REQUEST_FAILED';

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
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
          dispatch({type: LOGIN_REQUEST_REQUEST_SUCCESS});
          document.cookie = setCookie('token', data.accessToken.split('Bearer ')[1]);
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