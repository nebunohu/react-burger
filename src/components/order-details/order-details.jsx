import React from "react";

//Styles
import orderDetailsStyles from './order-details.module.css';

// Components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Images
import doneImage from '../../images/done.svg';

export default function OrderDetails(props) {
  return (
    <>
      <div className='mt-15 mr-10' style={{position: 'absolute', top: 0, right: 0}}>
        <div className='close-button' onClick={props.closeModal} style={{cursor: 'pointer'}} ><CloseIcon onClick={props.closeModal} /></div>
      </div>
      <div className={orderDetailsStyles.number+' text text_type_digits-large mt-30 mb-8'}>
        000000
      </div>
      <div className={`${orderDetailsStyles.title} text text_type_main-medium mb-15`}>
        идентификатор заказа
      </div>
      <div className={orderDetailsStyles.done+' mb-15'}>
        <img src={doneImage} alt="done" />
      </div>
      <span className={`${orderDetailsStyles.textRow1} text text_type_main-default mb-2`}>
        Ваш заказ начали готовить 
      </span>
      <span className={`${orderDetailsStyles.textRow2} text text_type_main-default mb-30`}>
        Дождитесь готовности на орбитальной станции 
      </span>
    </>
  );
}