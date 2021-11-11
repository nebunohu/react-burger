import React from "react";
import PropTypes from 'prop-types';

// Components
import {ConstructorElement, 
        DragIcon, 
        Button, 
        CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles
import constructorStyles from './burger-constructor.module.css';

// Data
//import { data } from '../../utils/data';

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

function BurgerConstructor(props) {
  return (
    <div className={constructorStyles.burgerConstructorWrapper+' ml-10 pt-25'}>
      <div className='pl-8 pr-4'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.burger.bun.name+' (верх)'}
          price={props.burger.bun.price}
          thumbnail={props.burger.bun.image}
        />
      </div>
      <div className={constructorStyles.innerWrapper}>
      {
        props.burger.ingredients.map((el, index) => {
          return (
            <div className={constructorStyles.constructorElementWrapper} key={index}>
              <DragIcon />
              <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image}
              />
            </div>
          );
        })
      }
      </div>
      
      <div className='pl-8 pr-4'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.burger.bun.name+' (низ)'}
          price={props.burger.bun.price}
          thumbnail={props.burger.bun.image}
        />
      </div>
      <div className={constructorStyles.totalWrapper+' mt-10'}>
        <div className={constructorStyles.total + ' text text_type_digits-medium mr-10'}>
          <span className='mr-2'>
            {props.burger.bun.price*2+props.burger.ingredients.reduce((previousValue, currentItem) => {return previousValue + currentItem.price}, 0)}
            </span>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
  
}

BurgerConstructor.propTypes ={
  burger: PropTypes.shape(
    {
      bun: PropTypes.shape(DATA_TYPE),
      ingredients: PropTypes.arrayOf(PropTypes.shape(DATA_TYPE))
    }
  )
};

export default BurgerConstructor;