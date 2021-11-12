import React from "react";

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyles.back}>
      {props.children}
    </div>
  );
}