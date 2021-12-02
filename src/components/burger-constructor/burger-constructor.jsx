import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from "react-redux";
import { useDrop } from "react-dnd";

// Components
import {ConstructorElement, 
        Button, 
        CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredientItem from "../conspructor-ingredient-item/constructor-ingredient-item";

// Styles
import constructorStyles from './burger-constructor.module.css';

// Data
//import { data } from '../../utils/data';

// Actions
import { ADD_INGREDIENT, postOrder, OPEN_ORDER_MODAL } from '../../services/actions/burgerActions';


function BurgerConstructor(props) {
  const data = useSelector(store => store.state.ingredients);
  const burger = useSelector(store => store.state.burger);
  
  let bunName, bunPrice, bunImage;

  const dispatch = useDispatch();

  const [{isHover}, dropTarget] = useDrop({
    accept: ["ingredient", 'inBurgerIngredient'],
    drop(itemId, monitor) {
      const type = monitor.getItemType();
      onDropHandler(itemId, type);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  function onDropHandler(item, type) {
    if (type === 'ingredient') {
      dispatch({type: ADD_INGREDIENT, ingredient: data.find(el => el._id === item.id)});
    } else {

    }
    
  }

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

  const wrapperClassName = `${isHover ? 'readyToDrop' : ''}`
  return (
    <div 
      className={`${constructorStyles.burgerConstructorWrapper} ml-10 mt-25`} 
      ref={dropTarget}
    >
      {/*<div 
        className={wrapperClassName} 
        style={{border: "2px solid rgba(0,0,0,0)", height: "calc(100vh - 244px)"}}
        
      >*/}
      {burger.ingredients.length === 0 && !bunName &&
        <div 
          className={wrapperClassName} 
          style={{
            height: 300, 
            border: "2px solid grey", 
            color:"grey",
            borderRadius: 25, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            fontSize: 35
          }} 
        >
          Добавьте ингредиенты
        </div>

      }

        {!!burger.bun.name && 
          <div className={constructorStyles.bunConstructor+' mb-2 ml-8 mr-4'}>
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
          <div className={constructorStyles.innerWrapper}>
            {burger.ingredients.map((el, index) => <ConstructorIngredientItem el={el} index={index} key={index}/>)}
          </div>
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
        
      {/*</div>*/}
      {(burger.ingredients.length > 0 || bunName) &&
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
        </div>}
    </div>
  );
  
}

BurgerConstructor.propTypes ={
  openModal: PropTypes.func,
};

export default BurgerConstructor;