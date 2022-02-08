import { wsReducer, initialState } from './ws-reducer';
import * as types from '../actions/ws-actions.ts';

describe('Websocket reducer', () => {
  it('should return the initial state', () => {
    expect(
      wsReducer(undefined,{})
    ).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_START', () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: false,
        },
        {
          type: types.WS_CONNECTION_START
        }
      )
    ).toEqual({
      ...initialState,
      wsConnected: true,
    })
  })

  it('should handle WS_CONNECTION_CLOSE', () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
        },
        {
          type: types.WS_CONNECTION_CLOSE
        }
      )
    ).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(
      wsReducer(
        {
          ...initialState
        },
        {
          type: types.WS_GET_MESSAGE,
          payload: {
            orders: [{
              _id: 'id',
              ingredients: [],
              status: 'status',
              createdAt: 'createdAt',
              name: 'name',
              number: 123,
              updatedAt: 'updatedAt'
            }],
            total: 100,
            totalToday: 10,
          }
        }
      )
    ).toEqual({
      ...initialState,
      orders: [{
        _id: 'id',
        ingredients: [],
        status: 'status',
        createdAt: 'createdAt',
        name: 'name',
        number: 123,
        updatedAt: 'updatedAt'
      }],
      total: 100,
      totalToday: 10,
    })
  })
})