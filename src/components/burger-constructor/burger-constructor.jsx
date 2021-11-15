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
  let bunName, bunPrice, bunImage;
  if(!!props.burger.bun) {
    bunName = props.burger.bun.name;
    bunPrice = props.burger.bun.price;
    bunImage = props.burger.bun.image;
  } else {
    bunName = '';
    bunPrice = 0;
    bunImage = '';
  }
  /*if(props.burger.bun.hasOwnProperty('name')) 
  else 
  if(props.burger.bun.hasOwnProperty('price')) 
  else 
  if(props.burger.bun.hasOwnProperty('image')) 
  else */
  return (
    <div className={`${constructorStyles.burgerConstructorWrapper} ml-10 pt-25`}>
      <div className={constructorStyles.bunConstructor+' ml-8 mr-4'}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bunName+' (верх)'}
          price={bunPrice}
          thumbnail={bunImage}
        />
      </div>
      {!!props.burger.ingredients.length &&
        (<div className={constructorStyles.innerWrapper}>
           {props.burger.ingredients.map((el, index) => {
            return (
              <div className={constructorStyles.constructorElementWrapper} key={index}>
                <DragIcon />
                <ConstructorElement
                  text={el.name }
                  price={el.price}
                  thumbnail={el.image}
                />
              </div>
            );
          })}
      
      
      </div>)}
      
      <div className={constructorStyles.bunConstructor+' ml-8 mr-4'}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bunName+' (низ)'}
          price={bunPrice}
          thumbnail={bunImage}
        />
      </div>
      <div className={`${constructorStyles.totalWrapper} mt-10 mr-4`}>
        <div className={constructorStyles.total + ' text text_type_digits-medium mr-10'}>
          <span className='mr-2'>
            {
              /*props.burger.bun.price*/bunPrice * 2 + 
              !!props.burger.ingredients 
              ? 
              props.burger.ingredients.reduce((previousValue, currentItem) => {
                return previousValue + currentItem.price
              }, 0) 
              : 
              0
            }
            </span>
          <CurrencyIcon />
        </div>
        <div style={{minWidth: 215}}>
        <Button type="primary" size="medium" onClick={props.openModal}>
          Оформить заказ
        </Button>
        </div>
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
  ),
  openModal: PropTypes.func,
};

export default BurgerConstructor;