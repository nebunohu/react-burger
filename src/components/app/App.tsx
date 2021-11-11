import React from 'react';

// Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

// Styles
import AppStyles from './App.module.css';

// Data
import { data } from '../../utils/data';

function App() {
  const [state, setState] = React.useState(
    {
      burger: {
        bun: data[0],
        ingredients: [...data],
      }
    }
  );

  return (
    <>
      <AppHeader />
      <div className={AppStyles.BurgerWrapper}>
        <BurgerIngredients data={data} />
        <BurgerConstructor burger={state.burger} /> 
      </div>
    </>
  );
}

export default App;
