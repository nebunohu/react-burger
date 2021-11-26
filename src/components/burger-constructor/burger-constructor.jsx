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
import { OrderContext } from "../../services/orderContext";
import { BurgerContext } from "../../services/burgerContext";
//import { data } from '../../utils/data';
import { API_URL } from '../../utils/url';
import { ADD_BURGER_NAME } from '../../services/burgerActions';



function BurgerConstructor(props) {
  //const { data } = React.useContext(AppContext);
  //const data = impData;
  const { order, setOrder } = React.useContext(OrderContext);
  const { burger, burgerDispatch } = React.useContext(BurgerContext);
  
  //const orderFetchURL = 'https://norma.nomoreparties.space/api/orders';
  let bunName, bunPrice, bunImage;

  if(!!burger.bun) {
    bunName = burger.bun.name;
    bunPrice = burger.bun.price;
    bunImage = burger.bun.image;
  } else {
    bunName = '';
    bunPrice = 0;
    bunImage = '';
  }

  const createOrderClickHandler = async () => {
    try {
      const headers = new Headers({"content-type": "application/json"})
      let fetchData = burger.ingredients.map(el => el._id);
      fetchData = JSON.stringify({ingredients: fetchData});
      const res = await fetch(`${API_URL}/orders`, {method: 'POST', mode: 'cors', headers, body: fetchData});
      if (res.ok) {
        const data = await res.json();
        if(data.success) {
          burgerDispatch({type: ADD_BURGER_NAME, name: data.name});
          setOrder({...order, number: data.order.number});
          props.openModal();
        }  
      } else {
        throw new Error('Fetch error');
      }
      
    } catch(e) {
      console.log(e)
    }
  }

  const deleteElementHandler = (e) => {
    console.log('click');
  }

  return (
    <div className={`${constructorStyles.burgerConstructorWrapper} ml-10 pt-25`}>
      {!!burger.bun.name && 
        <div className={constructorStyles.bunConstructor+' ml-8 mr-4'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bunName+' (верх)'}
            price={bunPrice}
            thumbnail={bunImage}
          />
        </div>
      }
      {!!burger.ingredients.length &&
        (<div className={constructorStyles.innerWrapper}>
           {burger.ingredients.map((el, index) => {
            return (
              <div className={`${constructorStyles.constructorElementWrapper} pr-2 mb-2`} key={index}>
                <div className='pr-2'><DragIcon /></div>
                <ConstructorElement
                  text={el.name }
                  price={el.price}
                  thumbnail={el.image}
                  handleClose={deleteElementHandler}
                />
              </div>
            );
          })}
        </div>)
      }
      
      {!!burger.bun.name && 
        <div className={constructorStyles.bunConstructor+' ml-8 mr-4'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bunName+' (низ)'}
            price={bunPrice}
            thumbnail={bunImage}
          />
        </div>
      }
      <div className={`${constructorStyles.totalWrapper} mt-10 mr-4`}>
        <div className={constructorStyles.total + ' text text_type_digits-medium mr-10'}>
          <span className='mr-2'>
            {/*
              bunPrice * 2 + 
              !!burger.ingredients 
              ? 
              burger.ingredients.reduce((previousValue, currentItem) => {
                return previousValue + currentItem.price
              }, 0) 
              : 
              0*/
            }
            {burger.totalPrice}
            </span>
          <CurrencyIcon />
        </div>
        <div style={{minWidth: 215}}>
        <Button type="primary" size="medium" onClick={createOrderClickHandler}>
          Оформить заказ
        </Button>
        </div>
      </div>
    </div>
  );
  
}

BurgerConstructor.propTypes ={
  openModal: PropTypes.func,
};

export default BurgerConstructor;