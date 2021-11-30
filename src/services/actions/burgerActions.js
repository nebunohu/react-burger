import { API_URL } from "../../utils/url";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SET_BURGER_NAME = 'SET_BURGER_NAME';

export const GET_INGREDIENTS_API_REQUEST = 'GET_INGREDIENTS_API_REQUEST';
export const GET_INGREDIENTS_API_REQUEST_SUCCESS = 'GET_INGREDIENTS_API_REQUEST_SUCCESS';
export const GET_INGREDIENTS_API_REQUEST_FAILED = 'GET_INGREDIENTS_API_REQUEST_FAILED';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_REQUEST_SUCCESS = 'POST_ORDER_REQUEST_SUCCESS';
export const POST_ORDER_REQUEST_FAILED = 'POST_ORDER_REQUEST_FAILED';

export const OPEN_INGREDIENTS_MODAL = 'OPEN_INGREDIENTS_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function getIngredients() {
  return async function(dispatch) {
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
}

export function postOrder(burger) {
  return async function(dispatch) {

    dispatch({type: POST_ORDER_REQUEST});
    try {
      const headers = new Headers({"content-type": "application/json"});
      let fetchData = burger.ingredients.map(el => el._id);
      fetchData = JSON.stringify({ingredients: fetchData});
      const res = await fetch(`${API_URL}/orders`, {method: 'POST', mode: 'cors', headers, body: fetchData});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          //setBurger({...burger, name: data.name});
          dispatch({type: SET_BURGER_NAME, name: data.name});
          dispatch({type: POST_ORDER_REQUEST_SUCCESS, orderNumber: data.order.number});
          //setOrder({...order, number: data.order.number});
          //props.openModal();
        }  
      } else {
        throw new Error('Post order fetch error');
      }
      
    } catch(e) {
      console.log(e);
      dispatch({type: POST_ORDER_REQUEST_FAILED});
    }
  }
}

