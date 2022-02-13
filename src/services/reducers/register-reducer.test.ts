import { registerReducer, initialState } from "./register-reducer";
import * as types from '../actions/register-actions';


describe('Register reducer', () => {
  it('should return the initial state', () => {
    expect(
      registerReducer(undefined,{} as any)
    ).toEqual(initialState)
  })

  it('should handle REGISTER_USER_REQUEST', () => {
    expect(
      registerReducer(
        {
          ...initialState,
          registerUserRequest: false,
        },
        {
          type: types.REGISTER_USER_REQUEST
        }
      )
    ).toEqual({
      ...initialState,
      registerUserRequest: true,
    })
  })

  it('should handle REGISTER_USER_REQUEST_SUCCESS', () => {
    expect(
      registerReducer(
        {
          ...initialState,
          registerUserRequest: true,
          registerUserRequestSuccess: false,
          registerUserRequestFailed: true,
        },
        {
          type: types.REGISTER_USER_REQUEST_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      registerUserRequest: false,
      registerUserRequestSuccess: true,
      registerUserRequestFailed: false,
    })
  })

  it('should handle REGISTER_USER_REQUEST_FAILED', () => {
    expect(
      registerReducer(
        {
          ...initialState,
          registerUserRequest: true,
          registerUserRequestFailed: false,
        },
        {
          type: types.REGISTER_USER_REQUEST_FAILED
        }
      )
    ).toEqual({
      ...initialState,
      registerUserRequest: false,
      registerUserRequestFailed: true,
    })
  })
})