import React, { FC } from "react";
import FeedOrder from "../../components/feed-order/feed-order";

// Styles
import feedPageStyles from './feed.module.css';

const FeedPage: FC = () => {
  return (
    <div className={`${feedPageStyles.container}`}>
      <div className={`${feedPageStyles.feedHeader} text text_type_main-large`}>Лента заказов</div>
      <div className={`${feedPageStyles.wrapper}`}>
        <section className={`${feedPageStyles.ordersFeedWrapper} mr-15`}>
          <FeedOrder />
          <FeedOrder />
        </section>  
        <section className={`${feedPageStyles.ordersInfoWrapper}`}>
          <div className="mb-15">
            <div className={`${feedPageStyles.readyOrdersWrapper} mr-6`}>
              <div className={`text text_type_main-medium mb-6`}>
                Готовы:
              </div>
              <div>
                orders
              </div>
            </div>
            <div className={`${feedPageStyles.inProgressOrdersWrapper}`}>
              <div className="text text_type_main-medium  mb-6">
                В работе:
              </div>
              <div >
                orders                
              </div>
            </div>
          </div>
          <div className="text text_type_main-medium mb-15">
            Выполнено за всё время: <br/> <span className={`${feedPageStyles.number} text text_type_digits-large`}>0000</span>
          </div>
          <div className="text text_type_main-medium">
            Выполнено за сегодня: <br/> <span className={`${feedPageStyles.number} text text_type_digits-large`}>0000</span>
          </div>
        </section>
      </div>
    </div>
      
  );
}

export default FeedPage;