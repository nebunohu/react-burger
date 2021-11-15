import React from "react";
import PropTypes from 'prop-types';

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  return (
    <div 
      className={modalOverlayStyles.back} 
      id="modal-overlay"
      onClick={props.closeModal} 
      onKeyDown={props.closeModal} 
      tabIndex="-1"  
    >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func
}