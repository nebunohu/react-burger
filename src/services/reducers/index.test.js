import { stateReducer, initialState } from './index';
import * as types from '../actions/burger-actions.ts';

const burger = {
  bun: null,
  ingredients: [],
  ingredientsCounts: [],
  name: '',
  totalPrice: 0
}

const ingredient = {
  "_id": "id",
  "name": "name",
  "type": "type",
  "proteins": 0,
  "fat": 0,
  "carbohydrates": 0,
  "calories": 0,
  "price": 0,
  "image": "image",
  "image_mobile": "image_mobile",
  "image_large": "image_large",
  "__v": 0,
};

describe('Burger state reducer', () => {
  it('should return the initial state', () => {
    expect(
      stateReducer(undefined,{})
    ).toEqual(initialState)
  })

  it('should handle ADD_INGREDIENT', () => {
    expect(
      stateReducer(
        {
          ...initialState,
        },
        {
          type: types.ADD_INGREDIENT,
          ingredient: ingredient,
        }
      )
    ).toEqual({
      ...initialState,
      burger: {
        ...burger,
        bun: {
          price: 0,
        },
        ingredients: [{index: 0, item: ingredient}],
        ingredientsCounts: [
          {
            count: 1,
            type: "type",
            id: "id"
          }
        ],

      }
    })
  })

  it('should handle SET_BURGER_NAME', () => {
    expect(
      stateReducer(
        initialState,
        {
          type: types.SET_BURGER_NAME,
          name: 'name',
        }
      )
    ).toEqual({
      ...initialState,
      burger: {
        ...initialState.burger,
        name: 'name'
        },
    })
  })

  it('should handle GET_INGREDIENTS_API_REQUEST', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          ingredientsRequest: false,
        },
        {
          type: types.GET_INGREDIENTS_API_REQUEST,
        }
      )
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
    })
  })

  it('should handle GET_INGREDIENTS_API_REQUEST_SUCCESS', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          ingredientsRequest: true,
          ingredientsRequestFailed: true,
          ingredients: [],
        },
        {
          type: types.GET_INGREDIENTS_API_REQUEST_SUCCESS,
          ingredients: [ingredient]
        }
      )
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsRequestFailed: false,
      ingredients: [ingredient]
    })
  })

  it('should handle GET_INGREDIENTS_API_REQUEST_FAILED', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          ingredientsRequest: true,
          ingredientsRequestFailed: false,
        },
        {
          type: types.GET_INGREDIENTS_API_REQUEST_FAILED
        }
      )
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
        ingredientsRequestFailed: true,
    })
  })

  it('should handle POST_ORDER_REQUEST', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          orderPostRequest: false,
        },
        {
          type: types.POST_ORDER_REQUEST
        }
      )
    ).toEqual({
      ...initialState,
      orderPostRequest: true,
    })
  })

  it('should handle POST_ORDER_REQUEST_SUCCESS', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          orderPostRequest: true,
          orderPostRequestFailed: true,
          burger: {
            ...initialState.burger,
            ingredients: [ingredient],
            ingredientsCounts: [{count: 1, type: 'type', id: 'id'}],
          },
        },
        {
          type: types.POST_ORDER_REQUEST_SUCCESS,
          orderNumber: 9999,
        }
      )
    ).toEqual({
      ...initialState,
      orderPostRequest: false,
      orderPostRequestFailed: false,
      burger: {
        ...initialState.burger,
        ingredients: [],
        ingredientsCounts: [],
      },
      order: {
        ...initialState.order,
        number: 9999,
      }
    })
  })

  it('should handle POST_ORDER_REQUEST_FAILED', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          orderPostRequest: true,
          orderPostRequestFailed: false,
        },
        {
          type: types.POST_ORDER_REQUEST_FAILED,
        }
      )
    ).toEqual({
      ...initialState,
      orderPostRequest: false,
      orderPostRequestFailed: true,
    })
  })

  it('should handle OPEN_INGREDIENTS_MODAL', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          modal: {
            ...initialState.modal,
            isModalOpen: false,
            isIngredModal: false,
          }
        },
        {
          type: types.OPEN_INGREDIENTS_MODAL,
        }
      )
    ).toEqual({
      ...initialState,
      modal: {
        ...initialState.modal,
        isModalOpen: true,
        isIngredModal: true,
      }
    })
  })

  it('should handle OPEN_ORDER_MODAL', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          modal: {
            ...initialState.modal,
            isModalOpen: false,
            isOrderModal: false,
          }
        },
        {
          type: types.OPEN_ORDER_MODAL,
        }
      )
    ).toEqual({
      ...initialState,
      modal: {
        ...initialState.modal,
        isModalOpen: true,
        isOrderModal: true,
      }
    })
  })

  it('should handle CLOSE_MODAL', () => {
    expect(
      stateReducer(
        {
          ...initialState,
          currentIngredient: ingredient,
          modal: {
            ...initialState.modal,
            isModalOpen: true,
            isIngredModal: true,
            isOrderModal: true,
          }
        },
        {
          type: types.CLOSE_MODAL,
        }
      )
    ).toEqual({
      ...initialState,
      currentIngredient: null,
      modal: {
        ...initialState.modal,
        isModalOpen: false,
        isIngredModal: false,
        isOrderModal: false,
      }
    })
  })
})