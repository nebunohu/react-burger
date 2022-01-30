import { FC } from "react";

// Styles
import imageStyle from './orders-ingredient-image.module.css';

type TOrdersIngredientImage = {
  src: string | undefined;
}

const OrdersIngredientImage:FC<TOrdersIngredientImage> = ({src}) => {
  return (
    <div className={`${imageStyle.wrapper}`}>
      <img className={`${imageStyle.image}`} src={src} alt=''/>
    </div>
  ) 
};

export default OrdersIngredientImage;