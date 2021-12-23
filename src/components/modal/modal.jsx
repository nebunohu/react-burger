import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

//Styles
import modalStyles from './modal.module.css';

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";
//import ModalHeader from "../modal-header/modal-header";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal(props) {

  React.useEffect(() => {
    const modal = document.getElementById('modal-wrapper');
    modal.focus();
  }, []);

  function escapeButtonHandler(e) {
    if(e.key === 'Escape') {
      props.closeModal();
    }
  }

  function closeButtonClickHandler() {
    props.closeModal();
  }

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={props.closeModal}>
      <div className={modalStyles.modalWrapper} id='modal-wrapper' onKeyDown={escapeButtonHandler} tabIndex="-1">
        <div className={`${modalStyles.closeButtonWrapper} mt-15 mr-10`}>
          <CloseIcon onClick={closeButtonClickHandler} />
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
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
}