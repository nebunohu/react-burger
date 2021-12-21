import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHistory } from 'react-router-dom';

// Components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";

// Actions
import { CLOSE_MODAL, OPEN_ORDER_MODAL, getIngredients, postOrder } from "../../services/actions/burger-actions";

// Styles
import cnstructorStyles from './constructor.module.css'

export default function ConstructorPage() {
  const { state, auth } = useSelector(store => store);
  const history = useHistory();
  //const { isAuth } = useSelector( store => store.auth.isAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
    
  }, [dispatch]);

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
  }

  const openOrderModal = () => {
    
    if ( auth.isAuth ) {
      dispatch(postOrder(state.burger));
      dispatch({type: OPEN_ORDER_MODAL});  
    } else {
      history.push('/login');
    }
    
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={cnstructorStyles.burgerWrapper}>
          <BurgerIngredients />
          <BurgerConstructor openOrderModal={openOrderModal} /> 
        </div>
      </DndProvider>
      {state.modal.isModalOpen && state.modal.isIngredModal &&   
        <Modal 
          title='Детали ингредиента'
          closeModal={closeModal}
        >
          <IngredientDetails />
        </Modal>}
      {state.modal.isModalOpen && state.modal.isOrderModal && 
        <Modal
          title=''
          closeModal={closeModal}
        >
          <OrderDetails />
        </Modal>}
    </>
  );
}