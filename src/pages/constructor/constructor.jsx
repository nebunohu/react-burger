import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { getUser } from "../../services/actions/user-actions";
import { getCookie } from "../../utils/cookie";
//import { refreshToken } from "../../services/actions/auth-actions";

export default function ConstructorPage() {
  const { state, auth } = useSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /*React.useEffect(() => {
    const token = getCookie('token');
    dispatch( refreshToken( { token } ) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  React.useEffect( () => {
    if(typeof auth.accessToken === 'string' && auth.accessToken !== '') dispatch( getUser( auth.accessToken ) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.accessToken]);

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
  }

  const openOrderModal = () => {
    
    if ( getCookie('token') ) {
      dispatch(postOrder(state.burger));
      dispatch({type: OPEN_ORDER_MODAL});  
    } else {
      navigate({ pathname: '/login', state: {from: location.pathname}});
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