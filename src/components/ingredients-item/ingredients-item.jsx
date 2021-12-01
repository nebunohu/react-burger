import React from "react";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";

import itemStyles from './ingredients-item.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { DATA_TYPE } from "../../utils/type";

import { SET_CURRENT_INGREDIENT, OPEN_INGREDIENTS_MODAL, ADD_INGREDIENT } from '../../services/actions/burgerActions';

function IngredientsItem(props) {
  const dispatch = useDispatch();

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: {id: props.item._id},
    collect: monitor => ({
      isDrag: monitor.isDragging
    })
  });

  function clickHandler(e) {
    dispatch({type: SET_CURRENT_INGREDIENT, ingredient: props.item});
    dispatch({type: OPEN_INGREDIENTS_MODAL});
    dispatch({type: ADD_INGREDIENT, ingredient: props.item});
  }

  return (
    <div className={itemStyles.itemWrapper} ref={dragRef} onClick={clickHandler}>
    {(props.count > 0) && (<div className={itemStyles.count+' text text_type_digits-default'}>{props.count}</div>)}
      <img src={props.item.image} alt='изображение' />
      <div className={itemStyles.price+' text text_type_digits-default mt-1 mb-1'}>
        <span className='mr-2'>{props.item.price}</span><CurrencyIcon />
      </div>
      <span className='text text_type_main-small'>{props.item.name}</span>
    </div>
  );
}

IngredientsItem.propTypes = {
  item: PropTypes.shape(DATA_TYPE).isRequired,
  count: PropTypes.number.isRequired
}

export default IngredientsItem;