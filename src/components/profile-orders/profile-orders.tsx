import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { WS_CONNECTION_START_WITH_TOKEN, WS_CONNECTION_CLOSE } from "../../services/actions/ws-actions";
import { TOrder } from "../../types/orders";
import FeedOrder from "../feed-order/feed-order";

// Styles
import profileOrdersStyles from './profile-orders.module.css';

const ProfileOrders: FC = () => {
  const { orders } = useSelector(store => store.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START_WITH_TOKEN, payload: ''});
    return () => {
      dispatch({type: WS_CONNECTION_CLOSE, payload: ''})
    }
  }, []);

  return (
    <div className={`${profileOrdersStyles.scrolledWindow}`}>
      {orders.map((el: TOrder, index: number) => <FeedOrder order={el} key={index}/>)}
    </div>
  )
};

export default ProfileOrders;