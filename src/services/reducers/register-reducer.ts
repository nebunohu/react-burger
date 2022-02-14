import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILED,
  TRegisterActions,
} from '../actions/register-actions'

type TRegisterState = {
  registerUserRequest: boolean;
  registerUserRequestFailed: boolean;
  registerUserRequestSuccess: boolean,
};

export const initialState: TRegisterState ={
  registerUserRequest: false,
  registerUserRequestSuccess: false,
  registerUserRequestFailed: false,
};

export function registerReducer( state = initialState, action: TRegisterActions ): TRegisterState {
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
        registerUserRequestSuccess: true,
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