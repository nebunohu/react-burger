import React, { FC, useEffect } from "react";

// Styles
import feedPageStyles from './feed.module.css';

// Types
import { TOrder } from "../../types/orders";

// Utils
import FeedOrder from "../../components/feed-order/feed-order";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions/ws-actions";



const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const {orders, total, totalToday} = useSelector(store => store.ws);
  
  useEffect(() => {
    dispatch({type: WS_CONNECTION_START, payload: ''});
    return () => {
      dispatch({type: WS_CONNECTION_CLOSE, payload: ''})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!orders.length) return null;

  return (
    <div className={`${feedPageStyles.container}`}>
      <div className={`${feedPageStyles.feedHeader} text text_type_main-large pt-8 mb-4`}>Лента заказов</div>
      <div className={`${feedPageStyles.wrapper}`}>
        <section className={`${feedPageStyles.scrolledWindow}`}>
          {orders.map((el: TOrder, index: number) => <FeedOrder order={el} key={index}/>)}
        </section>  
        <section className={`${feedPageStyles.ordersInfoWrapper} ml-15`}>
          <div className={`${feedPageStyles.ordersListsWrapper} mb-15`}>
            <div className={`${feedPageStyles.readyOrdersWrapper} mr-6`}>
              <div className={`text text_type_main-medium mb-6`}>
                Готовы:
              </div>
              <ul className={`${feedPageStyles.readyOrderslist} mr-6`}>
                {orders.filter((el: TOrder) => el.status === 'done').map((el,index) => {
                  return <li className={`${feedPageStyles.readyOrdersListItems} text text_type_digits-default`} key={index}>{el.number}</li>
                })}
              </ul>
            </div>
            <div className={`${feedPageStyles.inProgressOrdersWrapper}`}>
              <div className="text text_type_main-medium  mb-6">
                В работе:
              </div>
              <ul className={`${feedPageStyles.inProgressOrderslist} mr-6`}>
                {orders.filter((el: TOrder) => el.status === 'pending').map((el,index) => {return <li className={`text text_type_digits-default`} key={index}>{el.number}</li>})}
              </ul>
            </div>
          </div>
          <div className="text text_type_main-medium mb-15">
            Выполнено за всё время: <br/> <span className={`${feedPageStyles.number} text text_type_digits-large`}>{total}</span>
          </div>
          <div className="text text_type_main-medium">
            Выполнено за сегодня: <br/> <span className={`${feedPageStyles.number} text text_type_digits-large`}>{totalToday}</span>
          </div>
        </section>
      </div>
    </div>
      
  );
}

export default FeedPage;