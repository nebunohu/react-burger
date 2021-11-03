import React from "react";

// Styles
import ingredientsStyles from './burger-ingredients.module.css';

// Components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
  
    const [current, setCurrent] = React.useState('Булки');
    return (
      <>

              <div className={ingredientsStyles.table}>
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
            
        
        

      </>
    );
  
}

export default BurgerIngredients;