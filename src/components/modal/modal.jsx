import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

//Styles
import modalStyles from './modal.module.css';

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";
//import ModalHeader from "../modal-header/modal-header";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const DATA_TYPE =  {
  "_id": PropTypes.string,
  "name": PropTypes.string,
  "type": PropTypes.string,
  "proteins": PropTypes.number,
  "fat": PropTypes.number,
  "carbohydrates": PropTypes.number,
  "calories": PropTypes.number,
  "price": PropTypes.number,
  "image": PropTypes.string,
  "image_mobile": PropTypes.string,
  "image_large": PropTypes.string,
  "__v": PropTypes.number
};

export default function Modal(props) {
  let currentIngredient = {};
  if(props.modalState.isIngredModal) {
    currentIngredient = props.data.find(ingredient => ingredient._id === props.modalState.modalIngredientId);
  }

  React.useEffect(() => {
    const modal = document.getElementById('modal-overlay');
    modal.focus();
    /*document.addEventListener('keydown', props.closeModal);
    return () => {
      document.removeEventListener('keydown', props.closeModal);
    }*/
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={props.closeModal}>
      <div className={modalStyles.modalWrapper}>
        {props.modalState.isIngredModal &&
          (<>
            {/*<ModalHeader closeModal={props.closeModal} />*/}
            <IngredientDetails closeModal={props.closeModal} ingredient={currentIngredient} />
          </>)}
        {props.modalState.isOrderModal &&
          <OrderDetails closeModal={props.closeModal} orderNumber='000000' />}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.shape({
    isIngredModal: PropTypes.bool,
    isOrderModal: PropTypes.bool,
    modalIngredientId: PropTypes.string,
    }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(DATA_TYPE)),
}