import React from "react";
import { useSelector } from "react-redux";

//Styles
import orderDetailsStyles from './order-details.module.css';

// Components

// Images
import doneImage from '../../images/done.svg';

export default function OrderDetails(props) {
  const order = useSelector(store => store.state.order);
  return (
    <>
      
      <div className={orderDetailsStyles.number+' text text_type_digits-large mt-30 mb-8'}>
        {order.number}
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

