import React from "react";
import ReactDOM from "react-dom";

//Styles
import modalStyles from './modal.module.css';

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";
//import ModalHeader from "../modal-header/modal-header";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function Modal(props) {
  let currentIngredient = {};
  if(props.modalState.isIngredModal) {
    currentIngredient = props.data.find(ingredient => ingredient._id === props.modalState.modalIngredientId);
  }

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={props.closeModal}>
      <div className={modalStyles.modalWrapper}>
        {props.modalState.isIngredModal &&
          (<>
            {/*<ModalHeader closeModal={props.closeModal} />*/}
            <IngredientDetails closeModal={props.closeModal} ingredient={currentIngredient} />
          </>)}
        {props.modalState.isOrderModal &&
          <OrderDetails closeModal={props.closeModal} />}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
}