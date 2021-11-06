import React from "react";

// Styles
import ingredientsStyles from './burger-ingredients.module.css';

// Images


// Components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
//import IngredientsItem from "../ingredients-item/ingredients-item";
import IngredientsType from "../ingredients-type/ingredients-type";

// Data
//import { data } from '../../utils/data';

function BurgerIngredients(props) {
  
    const [current, setCurrent] = React.useState('Булки');
    return (
      <>
        <div className={ingredientsStyles.burgerIngredientsWrapper+' pt-10'}>
          <span className='text text_type_main-large'>Соберите бургер</span>
          <div className={ingredientsStyles.table+'mt-5'}>
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
            <IngredientsType type='bun' typeRus='Булки' />
            <IngredientsType type='sauce' typeRus='Соусы' />
            <IngredientsType type='main' typeRus='Начинки' />
          </div>
          
            
            
          
        </div>
          
            
        
        

      </>
    );
  
}

export default BurgerIngredients;