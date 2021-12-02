import { useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";

import itemStyles from "./constructor-ingredient-item.module.css";
import { DELETE_INGREDIENT } from "../../services/actions/burgerActions";

export default function ConstructorIngredientItem(props) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'inBurgerIngredient',
    item: {id: props.el._id}
  })

  function deleteElementHandler() {
    dispatch({type: DELETE_INGREDIENT, id: props.el._id, index: props.index});
  }

  return (
    <div className={`${itemStyles.constructorElementWrapper} pr-2 mb-2`} ref={dragRef} >
      <div className='pr-2' style={{cursor: "move"}} ><DragIcon /></div>
      <ConstructorElement
        text={props.el.name }
        price={props.el.price}
        thumbnail={props.el.image}
        handleClose={deleteElementHandler}
      />
    </div>
  );
}