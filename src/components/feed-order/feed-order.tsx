import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";

// Styles
import feedOrderStyles from '../feed-order/feed-order.module.css';

const FeedOrder: FC = () => {
  return (
    <div className={`${feedOrderStyles.wrapper}`}>
      <div className={`${feedOrderStyles.header}`}>
        <span className={`${feedOrderStyles.id}`}>

        </span>
        <span className={`${feedOrderStyles.date}`}>
          
        </span>
      </div>
      <div className={`${feedOrderStyles.name}`}>

      </div>
      <div className={`${feedOrderStyles.burgerInfo}`}>
        <div className={`${feedOrderStyles.burgerStack}`}>

        </div>
        <div className={`${feedOrderStyles.totalCost}`}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedOrder;