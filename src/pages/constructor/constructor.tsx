import React, { FC } from "react";
import { useSelector, useDispatch } from "../../hooks/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";

// Actions
import { CLOSE_MODAL, OPEN_ORDER_MODAL, postOrder } from "../../services/actions/burger-actions";

// Styles
import cnstructorStyles from './constructor.module.css'

const ConstructorPage: FC = () => {
  const { state } = useSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
  }

  const openOrderModal = () => {
    
    if ( localStorage.getItem('accessToken') ) {
      dispatch(postOrder(state.burger, localStorage.getItem('accessToken')));
      dispatch({type: OPEN_ORDER_MODAL});  
    } else {
      navigate('/login', { state: {from: location.pathname}});
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

export default ConstructorPage;