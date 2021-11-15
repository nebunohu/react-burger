import React from "react";

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyles.back} onClick={props.closeModal} onKeyDown={props.closeModal} tabIndex="-1">
      {props.children}
    </div>
  );
}