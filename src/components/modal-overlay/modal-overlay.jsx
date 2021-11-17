import React from "react";
import PropTypes from 'prop-types';

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  function onClickHandler(e) {
    if(e.target === props.modalOverlay.current) {
      props.closeModal();
    }
  }
  return (
    <div 
      className={modalOverlayStyles.back} 
      id="modal-overlay"
      ref={props.modalOverlay}
      onClick={onClickHandler} 
    >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalOverlay: PropTypes.any,
}