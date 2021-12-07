import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

// Styles
import modalOverlayStyles from './modal-overlay.module.css';

// Actions
import { CLOSE_MODAL } from "../../services/actions/burgerActions";

export default function ModalOverlay(props) {
  const dispatch = useDispatch();
  const modalOverlayRef = React.createRef();

  function onClickHandler(e) {
    if(e.target === modalOverlayRef.current) {
      dispatch({type: CLOSE_MODAL});
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
}
