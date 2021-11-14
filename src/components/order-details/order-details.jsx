import React from "react";

//Styles
import orderDetailsStyles from './order-details.module.css';

// Components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails(props) {
  return (
    <>
      <div className='mt-15 mr-10' style={{position: 'absolute', top: 0, right: 0}}>
        <CloseIcon onClick={props.closeModal} />
      </div>
      <div className={orderDetailsStyles.number+' text text_type_digits-large mt-30 mb-8'}>

      </div>
      <div className={orderDetailsStyles.title+' mb-15'}>
        идентификатор заказа
      </div>
      <div className={orderDetailsStyles.done+' mb-15'}>

      </div>
      <span className={orderDetailsStyles.textRow1+' mb-2'}>
        Ваш заказ начали готовить 
      </span>
      <span className={orderDetailsStyles.textRow2+' mb-30'}>
        Дождитесь готовности на орбитальной станции 
      </span>
    </>
  );
}