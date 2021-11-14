import React from "react";
import PropTypes from 'prop-types';

import itemStyles from './ingredients-item.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const DATA_TYPE =  {
  "_id": PropTypes.string,
  "name": PropTypes.string,
  "type": PropTypes.string,
  "proteins": PropTypes.number,
  "fat": PropTypes.number,
  "carbohydrates": PropTypes.number,
  "calories": PropTypes.number,
  "price": PropTypes.number,
  "image": PropTypes.string,
  "image_mobile": PropTypes.string,
  "image_large": PropTypes.string,
  "__v": PropTypes.number
};

function IngredientsItem(props) {
  return (
    <div className={itemStyles.itemWrapper} data-id={props.item['_id']} onClick={props.openModal}>
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
  item: PropTypes.shape(DATA_TYPE),
  count: PropTypes.number
}

export default IngredientsItem;