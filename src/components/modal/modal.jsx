import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

//Styles
import modalStyles from './modal.module.css';

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";
//import ModalHeader from "../modal-header/modal-header";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Data
//import { DATA_TYPE } from "../../utils/type";

export default function Modal(props) {
  /*let currentIngredient = {};
  if(props.modalState.isIngredModal) {
    currentIngredient = props.data.find(ingredient => ingredient._id === props.modalState.modalIngredientId);
  }*/

  React.useEffect(() => {
    const modal = document.getElementById('modal-wrapper');
    modal.focus();
    /*document.addEventListener('keydown', props.closeModal);
    return () => {
      document.removeEventListener('keydown', props.closeModal);
    }*/
  }, []);

  function escapeButtonHandler(e) {
    if(e.key === 'Escape') {
      props.closeModal();
    }
  }

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={props.closeModal}>
      <div className={modalStyles.modalWrapper} id='modal-wrapper' onKeyDown={escapeButtonHandler} tabIndex="-1">
        <div className={`${modalStyles.closeButtonWrapper} mt-15 mr-10`}>
          <CloseIcon onClick={props.closeModal} />
        </div>
        {
          !!props.title && 
            <div className={`${modalStyles.modalHeader} text text_type_main-large mt-10 mr-10 ml-10`}>
              {props.title}
            </div>
        }
        {props.children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  //data: PropTypes.arrayOf(PropTypes.shape(DATA_TYPE)),
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}