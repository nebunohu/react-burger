import {
  SET_USER,
  RESET_USER,
  GET_USER_REQUEST,
  GET_USER_REQUEST_SUCCESS,
  GET_USER_REQUEST_FAILED 
 } from '../actions/user-actions.js';

const initialState ={
  getUserRequest: false,
  getUserRequestFailed: false,
  name: '',
  email: ''
};

export function userReducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.user
      }
    }

    case RESET_USER: {
      return {
        ...state,
        name: '',
        email: ''
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state, 
        getUserRequest: true,
      }
    }

    case GET_USER_REQUEST_SUCCESS: {
      return {
        ...state, 
        getUserRequest: false,
        getUserRequestFailed: false
      }
    }

    case GET_USER_REQUEST_FAILED: {
      return {
        ...state, 
        getUserRequest: false,
        getUserRequestFailed: true
      }
    }

    default: return { ...state };
  }
}