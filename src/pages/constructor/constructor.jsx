import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";

// Actions
import { CLOSE_MODAL, getIngredients } from "../../services/actions/burgerActions";

// Styles
import cnstructorStyles from './constructor.module.css'

export default function ConstructorPage() {
  const {modal} = useSelector(store => store.state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
    
  }, [dispatch]);

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={cnstructorStyles.burgerWrapper}>
          <BurgerIngredients />
          <BurgerConstructor /> 
        </div>
      </DndProvider>
      {modal.isModalOpen && modal.isIngredModal &&   
        <Modal 
          title='Детали ингредиента'
          closeModal={closeModal}
        >
          <IngredientDetails />
        </Modal>}
      {modal.isModalOpen && modal.isOrderModal && 
        <Modal
          title=''
          closeModal={closeModal}
        >
          <OrderDetails />
        </Modal>}
    </>
  );
}