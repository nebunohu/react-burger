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
//import { DATA_TYPE } from "../../utils/type";
//import { AppContext } from '../../services/appContext';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки');
  //const { data } = React.useContext(AppContext);
  return (
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
        <IngredientsType type='bun' typeRus='Булки' openModal={props.openModal} />
        <IngredientsType type='sauce' typeRus='Соусы' openModal={props.openModal} />
        <IngredientsType type='main' typeRus='Начинки' openModal={props.openModal} />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;