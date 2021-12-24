import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { DATA_TYPE } from '../../utils/type';

import itemStyles from "./constructor-ingredient-item.module.css";
import { DELETE_INGREDIENT, UPDATE_BURGER_INGREDIENTS } from "../../services/actions/burger-actions";

export default function ConstructorIngredientItem({ el, index }) {
  const burgerIngredients = useSelector(store => store.state.burger.ingredients);
  const ref = useRef();
  const dispatch = useDispatch();

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    //const burger = [...burgerIngredients];
    const dragItem = burgerIngredients[dragIndex];

    dispatch({
      type: UPDATE_BURGER_INGREDIENTS,
      burger: update(burgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ],
      })
    });
  }, [burgerIngredients, dispatch]);

  const [,dropTarget] = useDrop({
    accept: 'inBurgerIngredient',
    hover: (item, monitor) => {
    
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex; 
    }
  });

  const [{isDragging}, dragRef] = useDrag({
    type: 'inBurgerIngredient',
    item: {id: el._id, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    
  })

  function deleteElementHandler() {
    dispatch({type: DELETE_INGREDIENT, id: el._id, index: index});
  }

  dragRef(dropTarget(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={`${itemStyles.constructorElementWrapper} pr-2`} ref={ref} style={{opacity}} >
      <div className='pr-2' style={{cursor: "move"}} ><DragIcon /></div>
      <ConstructorElement
        text={el.name }
        price={el.price}
        thumbnail={el.image}
        handleClose={deleteElementHandler}
      />
    </div>
  );
}

ConstructorIngredientItem.propTypes ={
  el: PropTypes.shape({
    index: PropTypes.number,
    item: PropTypes.shape(DATA_TYPE)
  }).isRequired,
  index: PropTypes.number.isRequired
};