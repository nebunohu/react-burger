import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

// Actions
import { ADD_INGREDIENT, getIngredients, OPEN_INGREDIENTS_MODAL, OPEN_ORDER_MODAL, CLOSE_MODAL } from '../../services/actions/burgerActions';

function App() {

  const {modal} = useSelector(store => store.state);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
    
  }, [dispatch]);



  function openIngredientsModal(ingredient) {
    dispatch({type: OPEN_INGREDIENTS_MODAL})
    //setCurrentIngredient(ingredient);
    dispatch({type: ADD_INGREDIENT, ingredient: ingredient});
  }
  
  function openOrderModal(e) {
    dispatch({type: OPEN_ORDER_MODAL})
  }

  const closeModal = (e) => {
    dispatch({type: CLOSE_MODAL})
  }

  return (
    <>
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
          <IngredientDetails />
        </Modal>}
      {modal.isModalOpen && modal.isOrderModal && 
        <Modal
          closeModal={closeModal} 
          title=''
        >
          <OrderDetails />
        </Modal>}
    </>
  );
}

export default App;
