import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from "react-redux";

// Components
import {ConstructorElement, 
        DragIcon, 
        Button, 
        CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles
import constructorStyles from './burger-constructor.module.css';

// Data
//import { data } from '../../utils/data';

// Actions
import {  postOrder, OPEN_ORDER_MODAL } from '../../services/actions/burgerActions';


function BurgerConstructor(props) {
  const burger = useSelector(store => store.state.burger);
  
  let bunName, bunPrice, bunImage;

  const dispatch = useDispatch();

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
    dispatch(postOrder(burger));
    dispatch({type: OPEN_ORDER_MODAL});
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