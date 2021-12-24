import React from "react";
import PropTypes from 'prop-types';

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  const modalOverlayRef = React.createRef();

  function onClickHandler(e) {
    if(e.target === modalOverlayRef.current) {
      props.closeModal();
    }
  }
  return (
    <div 
      className={modalOverlayStyles.back} 
      id="modal-overlay"
      ref={modalOverlayRef}
      onClick={onClickHandler} 
    >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
}
