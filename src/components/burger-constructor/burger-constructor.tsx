import React, { FC, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "../../hooks/hooks";
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
import { DATA_TYPE } from "../../react-burger-env";

// Actions
import { ADD_INGREDIENT } from '../../services/actions/burger-actions';


const BurgerConstructor: FC<{openOrderModal: (() => void) | ((e: SyntheticEvent) => void)}> = ({ openOrderModal }) => {
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

  function onDropHandler(item: any, type: any) {
    if (type === 'ingredient') {
      dispatch({type: ADD_INGREDIENT, ingredient: data.find((el: DATA_TYPE) => el._id === item.id)});
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

  const wrapperClassName = `${constructorStyles.dropTarget} ${isHover ? 'readyToDrop' : ''}`
  return (
    <div 
      className={`${constructorStyles.burgerConstructorWrapper} ml-10 mt-25`}
      data-test-id="drop-target" 
      ref={dropTarget}
    >
      {burger.ingredients.length === 0 && !bunName &&
        <div className={wrapperClassName} >
          Добавьте ингредиенты
        </div>

      }

        {!!bunName && 
          <div 
            className={constructorStyles.bunConstructor+' mb-2 ml-8 mr-4'}
            data-test-id="droppedBun"  
          >
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
            {burger.ingredients.map((el: {item: DATA_TYPE, index: number}, index: number) => <ConstructorIngredientItem el={el.item} index={index} key={el.index}/>)}
          </div>
        }
        
        {!!bunName && 
          <div className={constructorStyles.bunConstructor+' mt-2 ml-8 mr-4'}>
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
            <CurrencyIcon type='primary' />
          </div>
          {bunName && <div className={constructorStyles.buttonWrapper} data-test-id="create-order-button">
            <Button type="primary" size="medium" onClick={openOrderModal}>
              Оформить заказ
            </Button>
          </div>}
        </div>}
    </div>
  );
  
}

export default BurgerConstructor;