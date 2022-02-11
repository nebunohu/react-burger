import React, { FC } from "react";

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

type ModalOverlayProps = {
  closeModal: () => void;
  children: JSX.Element;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ closeModal, children} ) => {
  const modalOverlayRef = React.createRef<HTMLDivElement>();

  function onClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target === modalOverlayRef.current) {
      closeModal();
    }
  }
  return (
    <div 
      className={modalOverlayStyles.back} 
      id="modal-overlay"
      data-test-id="modal-overlay"
      ref={modalOverlayRef}
      onClick={onClickHandler} 
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
