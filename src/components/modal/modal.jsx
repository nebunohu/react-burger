import React from "react";

// Components
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function Modal() {
  return (
    <ModalOverlay>
      <ModalHeader />
    </ModalOverlay>
  );
}