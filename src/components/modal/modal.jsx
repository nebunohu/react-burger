import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

//Styles
import modalStyles from './modal.module.css';

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";
//import ModalHeader from "../modal-header/modal-header";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Actions
import  { CLOSE_MODAL } from '../../services/actions/burgerActions';

export default function Modal(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const modal = document.getElementById('modal-wrapper');
    modal.focus();
  }, []);

  function escapeButtonHandler(e) {
    if(e.key === 'Escape') {
      dispatch({type: CLOSE_MODAL});
    }
  }

  function closeButtonClickHandler() {
    dispatch({type: CLOSE_MODAL});
  }

  return ReactDOM.createPortal(
    <ModalOverlay>
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
}