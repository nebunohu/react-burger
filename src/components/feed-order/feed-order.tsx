import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import { useSelector } from "../../hooks/hooks";
import { DATA_TYPE } from "../../react-burger-env";
import { TOrder } from "../../types/orders";
import { useNavigate } from "react-router";

// Styles
import feedOrderStyles from '../feed-order/feed-order.module.css';
import OrdersIngredientImage from "../orders-ingredient-image/orders-ingredient-image";
import { useLocation } from "react-router";
import StatusComponent from "../status-component/status-component";

// Utils
import { dateOutput } from '../../utils/time';

type TFeedOrdrProps = {
  order: TOrder;
};

const FeedOrder: FC<TFeedOrdrProps> = ({order}) => {
  const ingredients = useSelector(store => store.state.ingredients);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCost = order.ingredients.reduce((prev, currEl) => {
    const foundIngredient = ingredients.find((el) => currEl === el._id);
    if(!foundIngredient) return 0;
    if(foundIngredient.type === 'bun') return prev + (foundIngredient!.price*2);
    else return prev + foundIngredient.price; 
  }, 0);

  function clickHandler(e: React.MouseEvent<HTMLDivElement> ) {
    navigate(`${location.pathname}/${order.number}`, {state: {background: location}});
  }

  return (
    <div className={`${feedOrderStyles.wrapper} p-6 mr-2 mb-4`} onClick={clickHandler}>
      <div className={`${feedOrderStyles.header}`}>
        <span className={`${feedOrderStyles.number} text text_type_main-small`}>
          #{order.number}
        </span>
        <span className={`${feedOrderStyles.date} text text_type_main-small text_color_inactive`}>
          {dateOutput(order.createdAt)/*orderTime.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute:'2-digit'})*/}
        </span>
      </div>
      <div className={`${feedOrderStyles.name} text text_type_main-default mt-6`}>
        {order.name}
      </div>
      <StatusComponent status={order.status} />
      <div className={`${feedOrderStyles.burgerInfo} mt-6`}>
        <div className={`${feedOrderStyles.burgerStack}`}>
          {order.ingredients.map((ingredId:string, index: number) => {
            const currentIngredient = ingredients.find((el: DATA_TYPE) => el._id === ingredId);
            if(currentIngredient) return (<OrdersIngredientImage zIndex={index} src={currentIngredient.image} remainCount={order.ingredients.length - index - 1} key={index}/>)
            else return null;
          })}
        </div>
        <div className={`${feedOrderStyles.totalCost} text text_type_digits-default`}>
          <span className="mr-1">{totalCost}</span> <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedOrder;