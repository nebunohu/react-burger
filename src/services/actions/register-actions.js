import { API_URL } from "../../utils/url";
//import { useHistory } from 'react-router-dom';

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
          //setBurger({...burger, name: data.name});
          //dispatch({type: SET_BURGER_NAME, name: data.name});
          dispatch({type: REGISTER_USER_REQUEST_SUCCESS});

          //setOrder({...order, number: data.order.number});
          //props.openModal();
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