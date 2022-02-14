import * as types from '../actions/constructor-tab-actions';
import { constructorTabReducer, initialState } from './constuctor-tab-reducer';

describe('Constructor tabs reducer', () => {
  it('should return the initial state', () => {
    expect(
      constructorTabReducer(undefined,{} as any)
    ).toEqual(initialState)

  })

  it('should handle UPDATE_CURRENT_TAB', () => {
    expect(
      constructorTabReducer(initialState, {
        type: types.UPDATE_CURRENT_TAB,
        id: 'bun',
        ratio:  0.5
      })
    ).toEqual(
      {
        tabs: [
          {
            id: 'bun',
            title: 'Булки',
            ratio: 0.5,
          },
          {
            id: 'sauce',
            title: 'Соусы',
            ratio: 0,
          },
          {
            id: 'main',
            title: 'Начинки',
            ratio: 0,
          }
        ]
      }
    )
  })
})