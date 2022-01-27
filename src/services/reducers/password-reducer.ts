import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
  FORGOT_PASSWORD_REDIRECT_CLEAR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  TPasswordActions
} from '../actions/password-actions.js'

type TPasswordState = {
  forgotPasswordRequest: boolean;
  forgotPasswordRequestFailed: boolean;
  fromForgotPasswordRedirect: boolean;

  resetPasswordRequest: boolean;
  resetPasswordRequestFailed: boolean;
  fromresetPasswordRedirect: boolean;
};

const initialState: TPasswordState ={
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
  fromForgotPasswordRedirect: false,

  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
  fromresetPasswordRedirect: false,
};

export function passwordReducer( state = initialState, action: TPasswordActions) {
  switch(action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      };
    }

    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
        fromForgotPasswordRedirect: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      };
    }

    case FORGOT_PASSWORD_REDIRECT_CLEAR: {
      return {
        ...state,
        fromForgotPasswordRedirect: false,
      }
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }

    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        fromResetPasswordRedirect: true,
      };
    }

    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      };
    }

    default: {
      return state;
    }
  }

  
}