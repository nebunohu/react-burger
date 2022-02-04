import { API_URL } from "../../utils/url";
import { DATA_TYPE } from '../../react-burger-env';
import { AppDispatch, AppThunk } from "../../types";
import { refreshToken } from "../../utils/token";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SET_BURGER_NAME: 'SET_BURGER_NAME' = 'SET_BURGER_NAME';
export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const UPDATE_BURGER_INGREDIENTS: 'UPDATE_BURGER_INGREDIENTS' = 'UPDATE_BURGER_INGREDIENTS';

export const GET_INGREDIENTS_API_REQUEST: 'GET_INGREDIENTS_API_REQUEST' = 'GET_INGREDIENTS_API_REQUEST';
export const GET_INGREDIENTS_API_REQUEST_SUCCESS: 'GET_INGREDIENTS_API_REQUEST_SUCCESS' = 'GET_INGREDIENTS_API_REQUEST_SUCCESS';
export const GET_INGREDIENTS_API_REQUEST_FAILED: 'GET_INGREDIENTS_API_REQUEST_FAILED' = 'GET_INGREDIENTS_API_REQUEST_FAILED';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_REQUEST_SUCCESS: 'POST_ORDER_REQUEST_SUCCESS' = 'POST_ORDER_REQUEST_SUCCESS';
export const POST_ORDER_REQUEST_FAILED: 'POST_ORDER_REQUEST_FAILED' = 'POST_ORDER_REQUEST_FAILED';

export const OPEN_INGREDIENTS_MODAL: 'OPEN_INGREDIENTS_MODAL' = 'OPEN_INGREDIENTS_MODAL';
export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: DATA_TYPE;
};

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredient: DATA_TYPE;
  readonly id: string;
  readonly index: number;
};

export interface ISetBurgerName {
  readonly type: typeof SET_BURGER_NAME;
  readonly name: string;
};

export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly ingredient: DATA_TYPE;
};

export interface IUpdateBurgerIngredients {
  readonly type: typeof UPDATE_BURGER_INGREDIENTS;
  readonly burger: Array<{index: number, item: DATA_TYPE}>;
}

export interface IGetIngredientsAPIRequest {
  readonly type: typeof GET_INGREDIENTS_API_REQUEST;
};

export interface IGetIngredientsAPIRequestSuccess {
  readonly type: typeof GET_INGREDIENTS_API_REQUEST_SUCCESS;
  readonly ingredients: Array<DATA_TYPE>;
};

export interface IGetIngredientsAPIRequestFailed {
  readonly type: typeof GET_INGREDIENTS_API_REQUEST_FAILED;
};

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
};

export interface IPostOrderRequestSuccess {
  readonly type: typeof POST_ORDER_REQUEST_SUCCESS;
  readonly orderNumber: number;
};

export interface IPostOrderRequestFailed {
  readonly type: typeof POST_ORDER_REQUEST_FAILED;
};

export interface IOpenIngredientsModal {
  readonly type: typeof OPEN_INGREDIENTS_MODAL;
};

export interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
};

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
};

export type TBurgerActions = 
  IAddIngredientAction | 
  IDeleteIngredientAction | 
  ISetBurgerName | 
  ISetCurrentIngredient | 
  IUpdateBurgerIngredients | 
  IGetIngredientsAPIRequest | 
  IGetIngredientsAPIRequestSuccess | 
  IGetIngredientsAPIRequestFailed |
  IPostOrderRequest |
  IPostOrderRequestSuccess |
  IPostOrderRequestFailed |
  IOpenIngredientsModal |
  IOpenOrderModal |
  ICloseModal ;

export const getIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch({type: GET_INGREDIENTS_API_REQUEST});
  const headers = new Headers({"content-type": "application/json"})
  try {
    const res = await fetch(`${API_URL}/ingredients`, { method: "GET", mode: "cors", headers});
    if (res.ok) {
      const resData = await res.json();
      dispatch({type: GET_INGREDIENTS_API_REQUEST_SUCCESS, ingredients: resData.data});
    } else {
      throw new Error ('Get ingredients fetch error');
    }
  } catch (error) {
    dispatch({type: GET_INGREDIENTS_API_REQUEST_FAILED});
    console.log(error);
  }
}


export const postOrder: AppThunk = (burger, token) => async (dispatch: AppDispatch) => {
  dispatch({type: POST_ORDER_REQUEST});
  try {
    const headers = new Headers({
      "content-type": "application/json",
      "authorization": token
    });
    let fetchData: Array<DATA_TYPE> = [];
    fetchData.push(burger.bun._id);
    if(burger.ingredients.length > 0) {
      fetchData = fetchData.concat(burger.ingredients.map((el: {index: number, item: DATA_TYPE} ) => el.item._id));
    }
    const body: string = JSON.stringify({ingredients: fetchData});
    const res = await fetch(`${API_URL}/orders`, {method: 'POST', mode: 'cors', headers, body});

    const data = await res.json();
    if(data.success) {
      //setBurger({...burger, name: data.name});
      dispatch({type: SET_BURGER_NAME, name: data.name});
      dispatch({type: POST_ORDER_REQUEST_SUCCESS, orderNumber: data.order.number});
      //setOrder({...order, number: data.order.number});
      //props.openModal();
      
    } else {
      if (data.message === 'jwt expired') {
        if(await refreshToken()) {
          const res = await fetch(`${API_URL}/orders`, {method: 'POST', mode: 'cors', headers, body});

          const data = await res.json();
          if(data.success) {
            //setBurger({...burger, name: data.name});
            dispatch({type: SET_BURGER_NAME, name: data.name});
            dispatch({type: POST_ORDER_REQUEST_SUCCESS, orderNumber: data.order.number});
          }
        }
      
      } else {
        throw new Error('Post order fetch error');
      }
    }
    
  } catch(e) {
    console.log(e);
    dispatch({type: POST_ORDER_REQUEST_FAILED});
  }
}


