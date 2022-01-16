import React, { FC } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from 'react-router-dom';

import itemStyles from './ingredients-item.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

//import { DATA_TYPE } from "../../utils/type";

import { SET_CURRENT_INGREDIENT, OPEN_INGREDIENTS_MODAL } from '../../services/actions/burger-actions';
import { DATA_TYPE } from "../../react-burger-env";

type TIngredientItemProps = {
  item: DATA_TYPE;
  count: number;
  key: string;
}

const IngredientsItem: FC<TIngredientItemProps> = ({item}) => {
  // @ts-ignore
  const burgerIngredientsCounts = useSelector(store => store.state.burger.ingredientsCounts);
  const current =  burgerIngredientsCounts.find((el: {count: number, type: string, id: string}) => el.id === item._id);
  const count = current ? current.count : 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {id: item._id},
    /*collect: monitor => ({
      isDrag: monitor.isDragging
    })*/
  });

  function clickHandler(e: React.MouseEvent<HTMLDivElement> ) {
    dispatch({type: SET_CURRENT_INGREDIENT, ingredient: item});
    dispatch({type: OPEN_INGREDIENTS_MODAL});
    navigate(`/ingredients/${item._id}`, {state: {background: location}});
  }

  return (

    <div className={itemStyles.itemWrapper} ref={dragRef} onClick={clickHandler}>
    {(count > 0) && (<div className={itemStyles.count+' text text_type_digits-default'}>{count}</div>)}
      <img src={item.image} alt='изображение' />
      <div className={itemStyles.price+' text text_type_digits-default mt-1 mb-1'}>
        <span className='mr-2'>{item.price}</span><CurrencyIcon type='primary' />
      </div>
      <span className='text text_type_main-small'>{item.name}</span>

    </div>
  );
}

/*IngredientsItem.propTypes = {
  item: PropTypes.shape(DATA_TYPE).isRequired
}*/

export default IngredientsItem;