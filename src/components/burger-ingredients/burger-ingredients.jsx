import React from "react";
import PropTypes from 'prop-types';

// Styles
import ingredientsStyles from './burger-ingredients.module.css';

// Images


// Components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
//import IngredientsItem from "../ingredients-item/ingredients-item";
import IngredientsType from "../ingredients-type/ingredients-type";

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

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки');
  return (
    <>
      <div className={ingredientsStyles.burgerIngredientsWrapper+' pt-10'}>
        <span className='text text_type_main-large'>Соберите бургер</span>
        <div className={ingredientsStyles.table+' mt-5'}>
          <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
          
        </div>
        <div className={ingredientsStyles.scrolledWindow}>
          <IngredientsType data={props.data} type='bun' typeRus='Булки' />
          <IngredientsType data={props.data} type='sauce' typeRus='Соусы' />
          <IngredientsType data={props.data} type='main' typeRus='Начинки' />
        </div>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.shape(DATA_TYPE)
};

export default BurgerIngredients;