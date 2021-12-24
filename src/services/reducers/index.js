import { combineReducers } from "redux";

// Reducers
import constructorTabReducer from "./constuctor-tab-reducer";
import { passwordReducer } from "./password-reducer";
import { userReducer } from "./user-reducer";
import { authReducer } from "./auth-reducer";

// Actions
import {
  ADD_INGREDIENT, 
  DELETE_INGREDIENT,
  SET_BURGER_NAME,
  SET_CURRENT_INGREDIENT,
  UPDATE_BURGER_INGREDIENTS,
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_REQUEST_SUCCESS,
  GET_INGREDIENTS_API_REQUEST_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_REQUEST_SUCCESS,
  POST_ORDER_REQUEST_FAILED,
  OPEN_INGREDIENTS_MODAL, 
  OPEN_ORDER_MODAL,
  CLOSE_MODAL
} from '../actions/burger-actions';



const initialState ={
  ingredients: [],
  burger: {
    bun: {},
    ingredients: [],
    ingredientsCounts: [],
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

  section: 'constructor',

  ingredientsRequest: false,
  ingredientsRequestFailed: false,

  orderPostRequest: false,
  orderPostRequestFailed: false,
}

function addIngredient(burger, ingredient) {
  let burgerState = {...burger};
  if (ingredient.type === 'bun') {
    burgerState.bun = ingredient;
    burgerState.ingredientsCounts = burgerState.ingredientsCounts.filter(el => el.type !== 'bun');
    burgerState.ingredientsCounts.push({count: 2, type: ingredient.type, id: ingredient._id});

  } else {
    const currentItem = burgerState.ingredients.find(el => el.item._id === ingredient._id);
    burgerState.ingredients.push({index: burgerState.ingredients.length, item: ingredient}); 
    if(!currentItem) {
      //const newItem = {count: 1, id: ingredient._id};
      
      burgerState.ingredientsCounts.push({count: 1, type: ingredient.type, id: ingredient._id});
    } else {
      //const currentId = burgerState.ingredients[burgerState.ingredients.indexOf(currentItem)]._id;
      burgerState.ingredientsCounts.find(el => el.id === ingredient._id).count++;
    }
    
  }

  burgerState.totalPrice = (!!burgerState.bun.price ? burgerState.bun.price : 0) * 2 + 
      (!!burgerState.ingredients 
      ? 
      burgerState.ingredients.reduce((previousValue, currentItem) => {
        return previousValue + currentItem.item.price
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
      const tempState = {...state};
      const currentItemPrice = tempState.burger.ingredients[action.index].item.price;
      tempState.burger.ingredients.splice(action.index, 1);
      
      const currentIndex = tempState.burger.ingredientsCounts.findIndex(el => el.id === action.id);
      let currentCount = tempState.burger.ingredientsCounts[currentIndex].count;
      //tempState.burger.ingredientsCounts[currentIndex].count--;
      if(currentCount > 1) { 
        currentCount--;
        tempState.burger.ingredientsCounts[currentIndex].count = currentCount;
      } else {
        tempState.burger.ingredientsCounts.splice(currentIndex, 1);
      } 
      tempState.burger.totalPrice = tempState.burger.totalPrice - currentItemPrice;

      return tempState;
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      }
    }
    case UPDATE_BURGER_INGREDIENTS: {
      return {
        ...state,
        burger: {
          ...state.burger,
          ingredients: action.burger,
        }
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
        burger: {
          ...initialState.burger,
          ingredients: [],
          ingredientsCounts: [],
        },
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
        currentIngredient: {},
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
  tabsState: constructorTabReducer,
  password: passwordReducer, 
  user: userReducer,
  auth: authReducer
});

export default rootReducer;