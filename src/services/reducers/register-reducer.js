import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILED,
} from '../actions/register-actions.js'

const initialState ={
  registerUserRequest: false,
  registerUserRequestFailed: false,
};

export function passwordReducer( state = initialState, action ) {
  switch(action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
      };
    }

    case REGISTER_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserRequestFailed: false,
      };
    }

    case REGISTER_USER_REQUEST_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserRequestFailed: true,
      };
    }

    default: {
      return state;
    }
  }

  
}