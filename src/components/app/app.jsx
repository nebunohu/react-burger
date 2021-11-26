import React, { useReducer } from 'react';

// Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

// Styles
import AppStyles from './app.module.css';

// Data
//import { impData } from '../../utils/data';
import { AppContext } from '../../services/appContext';
import { OrderContext } from '../../services/orderContext';
import { BurgerContext } from '../../services/burgerContext';

// Actions
import { ADD_INGREDIENT } from '../../services/burgerActions';

function App() {
  const dataURL = 'https://norma.nomoreparties.space/api/ingredients';
  /*const [burger, setBurger] = React.useState(
    {
      bun: {},
      ingredients: [],      
    }
  );*/
  const [data, setData] = React.useState([]);
  function burgerReducer(state, action) {
    switch(action.type) {
      case ADD_INGREDIENT: 
        return addIngredient(state, action.ingredient);
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
    }
  } 
  const [burger, burgerDispatch] = useReducer(burgerReducer, {
    bun: {},
    ingredients: [],
    name: '',
    totalPrice: 0
  });
  /*const [burger, setBurger] = React.useState({
    bun: {},
    ingredients: [],
    name: '',
    totalPrice: 0
  });*/
  const [order, setOrder] = React.useState({});
  const [modal, setModal] = React.useState({
    isModalOpen: false,
    isIngredModal: false,
    isOrderModal: false,
  });
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  React.useEffect(() => {
    const getIngredientsData = async () => {
      const headers = new Headers({ 
        "content-type": "application/json",
       });
      try {
        const res = await fetch(dataURL, { method: "GET", mode: "cors", headers});
        if(res.ok) {
          const resData = await res.json();
          setData(resData.data);
          
        } else {
          
          throw new Error('Fetch error'); 
        }
        
      } catch (e) {
        console.log(e);
      }
      
    }

    getIngredientsData();
    
  }, []);

  /*React.useEffect(() => {
    const ingredients = data.filter(el => el.type !== 'bun');
    setBurger({
      name: '',
      bun: data[0],
      ingredients: ingredients,
    });
  }, [data]);*/

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

  function openIngredientsModal(ingredient) {
    setModal({
      ...modal,
      isIngredModal: true,
      isModalOpen: true,
    });
    setCurrentIngredient(ingredient);
    burgerDispatch({type: ADD_INGREDIENT, ingredient: ingredient});
  }
  
  function openOrderModal(e) {
    setModal({
      ...modal,
      isOrderModal: true,
      isModalOpen: true,
      
    });
  }

  const closeModal = (e) => {
    setModal({
      ...modal,
      isIngredModal: false,
      isOrderModal: false,
      isModalOpen: false,
    });
  }

  return (
    <AppContext.Provider value={{data, setData}}>
      <OrderContext.Provider value={{order, setOrder}}>
        <BurgerContext.Provider value={{burger, burgerDispatch}}>
          <AppHeader />
          <div className={AppStyles.BurgerWrapper}>
            <BurgerIngredients openModal={openIngredientsModal} />
            <BurgerConstructor openModal={openOrderModal} /> 
          </div>
          {modal.isModalOpen && modal.isIngredModal &&   
            <Modal 
              closeModal={closeModal} 
              title='Детали ингредиента'
            >
              <IngredientDetails ingredient={currentIngredient} />
            </Modal>}
          {modal.isModalOpen && modal.isOrderModal && 
            <Modal
              closeModal={closeModal} 
              title=''
            >
              <OrderDetails />
            </Modal>}
        </BurgerContext.Provider>
      </OrderContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
