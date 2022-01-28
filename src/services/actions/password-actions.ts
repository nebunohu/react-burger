import { AppDispatch, AppThunk } from "../../types";
import { API_URL } from "../../utils/url";
//import { useHistory } from 'react-router-dom';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REQUEST_SUCCESS: 'FORGOT_PASSWORD_REQUEST_SUCCESS' = 'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const FORGOT_PASSWORD_REQUEST_FAILED: 'FORGOT_PASSWORD_REQUEST_FAILED' = 'FORGOT_PASSWORD_REQUEST_FAILED';
export const FORGOT_PASSWORD_REDIRECT_CLEAR: 'FORGOT_PASSWORD_REDIRECT_CLEAR' = 'FORGOT_PASSWORD_REDIRECT_CLEAR';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REQUEST_SUCCESS: 'RESET_PASSWORD_REQUEST_SUCCESS' = 'RESET_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_FAILED: 'RESET_PASSWORD_REQUEST_FAILED' = 'RESET_PASSWORD_REQUEST_FAILED';

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

export interface IForgotPasswordRequestSuccess {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
};

export interface IForgotPasswordRequestFailed {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
};

export interface IForgotPasswordRedirectClear {
  readonly type: typeof FORGOT_PASSWORD_REDIRECT_CLEAR;
};

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

export interface IResetPasswordRequestSuccess {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
};

export interface IResetPasswordRequestFailed {
  readonly type: typeof RESET_PASSWORD_REQUEST_FAILED;
};

export type TPasswordActions = IForgotPasswordRequest |
  IForgotPasswordRequestSuccess |
  IForgotPasswordRequestFailed |
  IForgotPasswordRedirectClear |
  IResetPasswordRequest |
  IResetPasswordRequestFailed |
  IResetPasswordRequestSuccess;

export const forgotPasswordRequest: AppThunk = (email: string) => async (dispatch: AppDispatch) => {
    //const history = useHistory();

    dispatch({type: FORGOT_PASSWORD_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/password-reset`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify({email})});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({type: FORGOT_PASSWORD_REQUEST_SUCCESS});
        }  
      } else {
        throw new Error('Forgot password fetch error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: FORGOT_PASSWORD_REQUEST_FAILED});
    }
  }


export const resetPasswordRequest:AppThunk = (body: string) => async (dispatch: AppDispatch) => {
    //const history = useHistory();

    dispatch({type: RESET_PASSWORD_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      const res = await fetch(`${API_URL}/password-reset/reset`, {method: 'POST', mode: 'cors', headers, body: JSON.stringify(body)});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS});
        }  
      } else {
        throw new Error('Forgot password fetch error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: RESET_PASSWORD_REQUEST_FAILED});
    }
  }
