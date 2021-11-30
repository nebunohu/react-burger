import { combineReducers } from "redux";

// Actions
import {
  ADD_INGREDIENT, 
  DELETE_INGREDIENT,
  SET_BURGER_NAME,
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_REQUEST_SUCCESS,
  GET_INGREDIENTS_API_REQUEST_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_REQUEST_SUCCESS,
  POST_ORDER_REQUEST_FAILED,
  OPEN_INGREDIENTS_MODAL, 
  OPEN_ORDER_MODAL,
  CLOSE_MODAL
} from '../actions/burgerActions';

const initialState ={
  indredients: [],
  burger: {
    bun: {},
    ingredients: [],
    name: '',
    totalPrice: 0
  },
  currentIngredient: {},

  order: {},

  modal: {
    isModalOpen: false,
    isIngredModal: false,
    isOrderModal: false,
  },

  ingredientsRequest: false,
  ingredientsRequestFailed: false,

  orderPostRequest: false,
  orderPostRequestFailed: false,
}

function addIngredient(burger, ingredient) {
  let burgerState = {...burger};
  if (ingredient.type === 'bun') {
    burgerState.bun =ingredient;
  } else {
    let tempArray = [...burgerState.ingredients];
    tempArray.push(ingredient);
    burgerState.ingredients = tempArray;
  }

  burgerState.totalPrice = (!!burgerState.bun.price ? burgerState.bun.price : 0) * 2 + 
      (!!burgerState.ingredients 
      ? 
      burgerState.ingredients.reduce((previousValue, currentItem) => {
        return previousValue + currentItem.price
      }, 0) 
      : 
      0);
  
  return burgerState;
}

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        burger: addIngredient(state.burger, action.ingredient),
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state
      }
    }
    case SET_BURGER_NAME: {
      return {
        ...state,
        burger: {
          ...state.burger,
          name: action.name,
        }
      }
    }
    case GET_INGREDIENTS_API_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_API_REQUEST_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsRequestFailed: false,
        ingredients: action.ingredients,
        
      }
    }
    case GET_INGREDIENTS_API_REQUEST_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsRequestFailed: true,
      }
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderPostRequest: true,
      }
    }
    case POST_ORDER_REQUEST_SUCCESS: {
      return {
        ...state,
        orderPostRequest: false,
        orderPostRequestFailed: false,
        order: {
          ...state.order,
          number: action.orderNumber,
        } 
        
      }
    }
    case POST_ORDER_REQUEST_FAILED: {
      return {
        ...state,
        orderPostRequest: false,
        orderPostRequestFailed: true,
      }
    }
    case OPEN_INGREDIENTS_MODAL: {
      return {
        ...state,
        modal: {
          ...state.modal,
          isModalOpen: true,
          isIngredModal: true,
        }
      }
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        modal: {
          ...state.modal,
          isModalOpen: true,
          isOrderModal: true,
        }
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: {
          ...state.modal,
          isModalOpen: false,
          isIngredModal: false,
          isOrderModal: false,
        }
      }
    }
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  state: stateReducer,
});

export default rootReducer;