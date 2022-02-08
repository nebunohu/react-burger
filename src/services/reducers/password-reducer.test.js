import { passwordReducer, initialState } from "./password-reducer";
import * as types from '../actions/password-actions';


describe('Password reducer', () => {
  it('should return the initial state', () => {
    expect(
      passwordReducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      passwordReducer({
        ...initialState,
        forgotPasswordRequest: false
      }, 
      {
        type: types.FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: true
      }
    )
  })

  it('should handle FORGOT_PASSWORD_REQUEST_SUCCESS', () => {
    expect(
      passwordReducer({
        ...initialState,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: true,
        fromForgotPasswordRedirect: false,
      }, 
      {
        type: types.FORGOT_PASSWORD_REQUEST_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
        fromForgotPasswordRedirect: true,
      }
    )
  })

  it('should handle FORGOT_PASSWORD_REQUEST_FAILED', () => {
    expect(
      passwordReducer({
        ...initialState,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
      }, 
      {
        type: types.FORGOT_PASSWORD_REQUEST_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      }
    )
  })

  it('should handle FORGOT_PASSWORD_REDIRECT_CLEAR', () => {
    expect(
      passwordReducer({
        ...initialState,
        fromForgotPasswordRedirect: true,
      }, 
      {
        type: types.FORGOT_PASSWORD_REDIRECT_CLEAR,
      })
    ).toEqual(
      {
        ...initialState,
        fromForgotPasswordRedirect: false,
      }
    )
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      passwordReducer({
        ...initialState,
        resetPasswordRequest: false
      }, 
      {
        type: types.RESET_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: true
      }
    )
  })

  it('should handle RESET_PASSWORD_REQUEST_SUCCESS', () => {
    expect(
      passwordReducer({
        ...initialState,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: true,
        fromResetPasswordRedirect: false,
      }, 
      {
        type: types.RESET_PASSWORD_REQUEST_SUCCESS,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        fromResetPasswordRedirect: true,
      }
    )
  })

  it('should handle RESET_PASSWORD_REQUEST_FAILED', () => {
    expect(
      passwordReducer({
        ...initialState,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      }, 
      {
        type: types.RESET_PASSWORD_REQUEST_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      }
    )
  })
})