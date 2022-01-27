import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILED,
  TRegisterActions,
} from '../actions/register-actions.js'

type TRegisterState = {
  registerUserRequest: boolean;
  registerUserRequestFailed: boolean;
};

const initialState: TRegisterState ={
  registerUserRequest: false,
  registerUserRequestFailed: false,
};

export function passwordReducer( state = initialState, action: TRegisterActions ) {
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