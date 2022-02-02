import { FC } from "react";

// Styles
import imageStyle from './orders-ingredient-image.module.css';

type TOrdersIngredientImage = {
  src: string;
  zIndex?: number | undefined;
  remainCount?: number | undefined;
}

const indexes: Array<string> = ['zIndex1', 'zIndex2', 'zIndex3', 'zIndex4', 'zIndex5', 'zIndex6'];  


const OrdersIngredientImage:FC<TOrdersIngredientImage> = ({src, zIndex, remainCount}) => {
  if(typeof zIndex !== 'undefined') {
    if(zIndex < 6 ) {
      return (
        <div className={`${imageStyle.wrapper} ${imageStyle[indexes[zIndex]]}`}>
          {zIndex === 5 && remainCount && <div className={`${imageStyle.overlay} text text_type_digits-default`}>+{remainCount}</div>}
          <img className={`${imageStyle.image}`} src={src} alt=''/>
        </div>
      ) 
    } else {
      return null;
    }
  }
  return (
    <div className={`${imageStyle.wrapperBlock}`}>
      <img className={`${imageStyle.image}`} src={src} alt=''/>
    </div>
  )
  
};

export default OrdersIngredientImage;