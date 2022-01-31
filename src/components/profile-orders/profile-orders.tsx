import { FC } from "react";
import { useSelector } from "../../hooks/hooks";
import { TOrder } from "../../types/orders";
import FeedOrder from "../feed-order/feed-order";

// Styles
import profileOrdersStyles from './profile-orders.module.css';

const ProfileOrders: FC = () => {
  const { orders } = useSelector(store => store.ws);
  return (
    <div className={`${profileOrdersStyles.scrolledWindow}`}>
      {orders.map((el: TOrder, index: number) => <FeedOrder order={el} key={index}/>)}
    </div>
  )
};

export default ProfileOrders;