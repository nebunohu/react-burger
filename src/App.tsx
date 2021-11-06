import React from 'react';
import './App.css';

// Components
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

// Styles
import AppStyles from './App.module.css';

// Data
import { data } from './utils/data';

function App() {
  const state = {burger: {
                  bun: data[0],
                  ingredients: [...data],
                }
  } 
  return (
    <>
      <AppHeader />
      <div className={AppStyles.BurgerWrapper}>
        <BurgerIngredients />
        <BurgerConstructor burger={state.burger} /> 
      </div>
    </>
  );
}

export default App;
