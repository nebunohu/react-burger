import { userReducer, initialState } from './user-reducer';
import * as types from '../actions/user-actions';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(
      userReducer(undefined,{} as any)
    ).toEqual(initialState)
  })

  it('should handle SET_USER', () => {
    expect(
      userReducer(
        {
          ...initialState
        },
        {
          type: types.SET_USER,
          user: {name: 'name', email: 'email'}
        }
      )
    ).toEqual({
      ...initialState,
      name: 'name', 
      email: 'email'
    })
  })

  it('should handle RESET_USER', () => {
    expect(
      userReducer(
        {
          ...initialState,
          name: 'name', 
          email: 'email',
          isUserLoaded: true
        },
        {
          type: types.RESET_USER
        }
      )
    ).toEqual({
      ...initialState,
      name: '', 
      email: '',
      isUserLoaded: false
    })
  })

  it('should handle GET_USER_REQUEST', () => {
    expect(
      userReducer(
        {
          ...initialState,
          getUserRequest: false,
        },
        {
          type: types.GET_USER_REQUEST
        }
      )
    ).toEqual({
      ...initialState,
      getUserRequest: true,
    })
  })

  it('should handle GET_USER_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          ...initialState,
          getUserRequest: true,
          getUserRequestFailed: true,
          isUserLoaded: false,
        },
        {
          type: types.GET_USER_REQUEST_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserRequestFailed: false,
      isUserLoaded: true,
    })
  })

  it('should handle GET_USER_REQUEST_FAILED', () => {
    expect(
      userReducer(
        {
          ...initialState,
          getUserRequest: true,
          getUserRequestFailed: false
        },
        {
          type: types.GET_USER_REQUEST_FAILED
        }
      )
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserRequestFailed: true
    })
  })

  it('should handle EDIT_USER_REQUEST', () => {
    expect(
      userReducer(
        {
          ...initialState,
          editUserRequest: false,
          editUserRequestSuccess: true,
          editUserRequestFailed: true,
        },
        {
          type: types.EDIT_USER_REQUEST
        }
      )
    ).toEqual({
      ...initialState,
      editUserRequest: true,
      editUserRequestSuccess: false,
      editUserRequestFailed: false,
    })
  })

  it('should handle EDIT_USER_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          ...initialState,
          editUserRequest: true,
          editUserRequestSuccess: false,
        },
        {
          type: types.EDIT_USER_REQUEST_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      editUserRequest: false,
      editUserRequestSuccess: true,
    })
  })

  it('should handle EDIT_USER_REQUEST_FAILED', () => {
    expect(
      userReducer(
        {
          ...initialState,
          editUserRequest: true,
          editUserRequestFailed: false
        },
        {
          type: types.EDIT_USER_REQUEST_FAILED
        }
      )
    ).toEqual({
      ...initialState,
      editUserRequest: false,
      editUserRequestFailed: true
    })
  })

  it('should handle SET_IS_USER_LOADED', () => {
    expect(
      userReducer(
        {
          ...initialState,
          isUserLoaded: false,
        },
        {
          type: types.SET_IS_USER_LOADED
        }
      )
    ).toEqual({
      ...initialState,
      isUserLoaded: true,
    })
  })

  it('should handle RESET_IS_USER_LOADED', () => {
    expect(
      userReducer(
        {
          ...initialState,
          isUserLoaded: true,
        },
        {
          type: types.RESET_IS_USER_LOADED
        }
      )
    ).toEqual({
      ...initialState,
      isUserLoaded: false,
    })
  })
})