import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useSelector } from "../../hooks/hooks";
import OrdersIngredientImage from "../orders-ingredient-image/orders-ingredient-image";

// Styles
import styles from './burger-composition-element.module.css'

type TBurgerCompositionElement = {
  className?: string;
  ingredientId: string; 
  count: number;
}

const BurgerCompositionElement: FC<TBurgerCompositionElement> = ({ ingredientId, count, className }) => {
  const { ingredients } = useSelector(store => store.state);
  const currentIngredient = ingredients.find((el) => el._id === ingredientId);
  if (!currentIngredient) {
    return null;
  }
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={`${styles.nameWrapper}`}>
        <OrdersIngredientImage src={currentIngredient.image} />
        <div className={`text text_type_main-default ml-4`}>
          {currentIngredient.name}
        </div>
      </div>
      <div className={`${styles.costWrapper} text text_type_digits-default`}>
        <span className={`mr-2`}>{currentIngredient.type === 'bun' ? count*2 : count} x {currentIngredient.price}</span><CurrencyIcon type='primary'/>
      </div>
    </div>
  );
};

export default BurgerCompositionElement;