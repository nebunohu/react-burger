import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
} from '../actions/password-actions.js'

const initialState ={
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
};

export function passwordReducer( state = initialState, action ) {
  switch(action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      };
    }

    default: {
      return {...state};
    }
  }

  
}