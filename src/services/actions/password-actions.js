import { API_URL } from "../../utils/url";
//import { useHistory } from 'react-router-dom';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED';

export function forgotPasswordRequest(email) {
  return async function(dispatch) {
    //const history = useHistory();

    dispatch({type: FORGOT_PASSWORD_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/password-reset`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify({email})});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          //setBurger({...burger, name: data.name});
          //dispatch({type: SET_BURGER_NAME, name: data.name});
          dispatch({type: FORGOT_PASSWORD_REQUEST_SUCCESS});

          //setOrder({...order, number: data.order.number});
          //props.openModal();
        }  
      } else {
        throw new Error('Forgot password fetch error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: FORGOT_PASSWORD_REQUEST_FAILED});
    }
  }
}

export function resetPasswordRequest(email) {
  return async function(dispatch) {
    //const history = useHistory();

    dispatch({type: RESET_PASSWORD_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/password-reset/reset`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify({email})});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          //setBurger({...burger, name: data.name});
          //dispatch({type: SET_BURGER_NAME, name: data.name});
          dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS});

          //setOrder({...order, number: data.order.number});
          //props.openModal();
        }  
      } else {
        throw new Error('Forgot password fetch error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: RESET_PASSWORD_REQUEST_FAILED});
    }
  }
}