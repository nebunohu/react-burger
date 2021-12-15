import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_REQUEST_SUCCESS,
  LOGIN_REQUEST_REQUEST_FAILED,
} from '../actions/login-actions.js'

const initialState ={
  loginRequest: false,
  loginRequestFailed: false,
};

export function passwordReducer( state = initialState, action ) {
  switch(action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }

    case LOGIN_REQUEST_REQUEST_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: false,
      };
    }

    case LOGIN_REQUEST_REQUEST_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
      };
    }

    default: {
      return {...state};
    }
  }

  
}