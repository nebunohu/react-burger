import React from "react";

// Components
import {ConstructorElement, 
        DragIcon, 
        Button, 
        CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles
import constructorStyles from './burger-constructor.module.css';

// Data
//import { data } from '../../utils/data';

class BurgerConstructor extends React.Component {
  render() {
    return (
      <div className={constructorStyles.burgerConstructorWrapper}>
        <div><ConstructorElement
          type="top"
          isLocked={true}
          text={this.props.burger.bun.name+' (верх)'}
          price={this.props.burger.bun.price}
          thumbnail={this.props.burger.bun.image}
        /></div>
        <div className={constructorStyles.innerWrapper}>
        {
          this.props.burger.ingredients.map((el) => {
            return (
              <div className={constructorStyles.constructorElementWrapper}>
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
        
        <div><ConstructorElement
          type="bottom"
          isLocked={true}
          text={this.props.burger.bun.name+' (низ)'}
          price={this.props.burger.bun.price}
          thumbnail={this.props.burger.bun.image}
        /></div>
        <div className={constructorStyles.totalWrapper}>
          <div className={constructorStyles.total + ' text text_type_digits-medium'}>
            {this.props.burger.bun.price*2+this.props.burger.ingredients.reduce((previousItem, currentItem) => {return previousItem.price + currentItem.price})}
            <CurrencyIcon />
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;