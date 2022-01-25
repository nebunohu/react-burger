import React, { FC } from "react";
import FeedOrder from "../../components/feed-order/feed-order";

// Styles
import feedPageStyles from './feed.module.css';

const FeedPage: FC = () => {
  return (
    <div className={`${feedPageStyles.wrapper}`}>
      <div className={`${feedPageStyles.feedHeader} text text_type_main-large`}>Лента заказов</div>
      <div className={`${feedPageStyles.wrapper}`}>
        <section className={`${feedPageStyles.ordersFeedWrapper}`}>
          <FeedOrder />
        </section>  
        <section>
          <div>
            <div>
              <div>
                ГотовыЖ
              </div>
              <div>
                orders
              </div>
            </div>
            <div>
              <div>
                В рвботе:
              </div>
              <div>
                orders                
              </div>
            </div>
          </div>
          <div>
            Выполнено за всё время:
          </div>
          <div>
            Выполнено за сегодня:
          </div>
        </section>
      </div>
    </div>
      
  );
}

export default FeedPage;