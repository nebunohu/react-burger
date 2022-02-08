import { authReducer, initialState } from "./auth-reducer";
import * as types from "../actions/auth-actions";

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      authReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_IS_AUTH', () => {
    expect(
      authReducer(initialState, {
        type: types.SET_IS_AUTH
      })
    ).toEqual(
      {
        ...initialState,
        isAuth: true,
      }
    )
  })

  it('should handle RESET_IS_AUTH', () => {
    expect(
      authReducer(
        {
          ...initialState,
          isAuth: true,
          fromLoginRedirect: true,
          accessToken: 'token',
        }, 
        {
          type: types.RESET_IS_AUTH
        }
      )
    ).toEqual(
      {
        ...initialState,
        isAuth: false,
        fromLoginRedirect: false,
        accessToken: '',
      }
    )
  })

  it('should handle REFRESH_TOKEN_REQUEST', () => {
    expect(
      authReducer(
        {
          ...initialState,
          refreshTokenRequest: false,
          refreshTokenRequestFailed: true,
        }, 
        {
          type: types.REFRESH_TOKEN_REQUEST
        }
      )
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      }
    )
  })

  it('should handle REFRESH_TOKEN_REQUEST_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialState,
          refreshTokenRequest: true,
          refreshTokenRequestFailed: true,
        }, 
        {
          type: types.REFRESH_TOKEN_REQUEST_SUCCESS
        }
      )
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: false,
      }
    )
  })

  it('should handle REFRESH_TOKEN_REQUEST_FAILED', () => {
    expect(
      authReducer(
        {
          ...initialState,
          refreshTokenRequest: true,
          refreshTokenRequestFailed: false,
        }, 
        {
          type: types.REFRESH_TOKEN_REQUEST_FAILED
        }
      )
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      }
    )
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(
      authReducer(
        {
          ...initialState,
          loginRequest: false,
        }, 
        {
          type: types.LOGIN_REQUEST
        }
      )
    ).toEqual(
      {
        ...initialState,
        loginRequest: true,
      }
    )
  })

  it('should handle LOGIN_REQUEST_REQUEST_SUCCESS', () => {
    expect(
      authReducer(
        {
          ...initialState,
          loginRequest: true,
          loginRequestFailed: true,
          fromLoginRedirect: false
        }, 
        {
          type: types.LOGIN_REQUEST_REQUEST_SUCCESS
        }
      )
    ).toEqual(
      {
        ...initialState,
        loginRequest: false,
        loginRequestFailed: false,
        fromLoginRedirect: true
      }
    )
  })

  it('should handle LOGIN_REQUEST_REQUEST_FAILED', () => {
    expect(
      authReducer(
        {
          ...initialState,
          loginRequest: true,
          loginRequestFailed: false,
        }, 
        {
          type: types.LOGIN_REQUEST_REQUEST_FAILED
        }
      )
    ).toEqual(
      {
        ...initialState,
        loginRequest: false,
        loginRequestFailed: true,
      }
    )
  })
})