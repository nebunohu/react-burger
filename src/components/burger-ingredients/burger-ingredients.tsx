import React, { FC } from "react";
import { useSelector } from "../../hooks/hooks";

// Styles
import ingredientsStyles from './burger-ingredients.module.css';

// Components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsType from "../ingredients-type/ingredients-type";

// Data

const BurgerIngredients: FC = () => {
  //const [current, setCurrent] = React.useState('Булки');
  const current = useSelector((store) => store.tabsState.tabs.reduce((current, tab) => {
    return current.ratio < tab.ratio ? tab : current
  }, store.tabsState.tabs[0]).title);
  const bunRef = React.useRef<HTMLLIElement>(null);
  const sauceRef = React.useRef<HTMLLIElement>(null);
  const mainRef = React.useRef<HTMLLIElement>(null);

  const setTab = (tab: string) => {
    //setCurrent(tab);
    switch (tab) {
      case 'Булки':
        if (bunRef.current) bunRef.current.scrollIntoView({ behavior: "smooth" });
      break;
      case 'Соусы':
        if (sauceRef.current) sauceRef.current.scrollIntoView({ behavior: "smooth" });
      break;
      case 'Начинки':
        if (mainRef.current) mainRef.current.scrollIntoView({ behavior: "smooth" });
      break;
      default:
        return;
    }
  };
  
  return (
    <div className={ingredientsStyles.burgerIngredientsWrapper+' pt-10'}>
      <span className='text text_type_main-large'>Соберите бургер</span>
      <div className={ingredientsStyles.table+' mt-5'}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab  value='Начинки' active={current === 'Начинки'} onClick={setTab}>
          Начинки
        </Tab>
        
      </div>
      <ul className={ingredientsStyles.scrolledWindow} >
        <li ref={bunRef}>
          <IngredientsType reference={bunRef} id='bun' type='Булки' />
        </li>
        <li ref={sauceRef}>
          <IngredientsType reference={sauceRef} id='sauce' type='Соусы' />
        </li>
        <li ref={mainRef}>          
          <IngredientsType reference={mainRef} id='main' type='Начинки' />
        </li>
      </ul>
    </div>
  );
}

export default BurgerIngredients;