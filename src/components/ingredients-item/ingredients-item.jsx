import React from "react";

import itemStyles from './ingredients-item.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class IngredientsItem extends React.Component {
  render() {
    return (
      <div className={itemStyles.itemWrapper}>
      <div className={itemStyles.count+' text text_type_digits-default'}>{this.props.count}</div>
        <img src={this.props.item.image} alt='изображение' />
        <div className={itemStyles.price+' text text_type_digits-default mt-1 mb-1'}>
          <span className='mr-2'>{this.props.item.price}</span><CurrencyIcon />
        </div>
        <span className='text text_type_main-small'>{this.props.item.name}</span>
      </div>
    );
  }
}

export default IngredientsItem;