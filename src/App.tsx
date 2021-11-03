import React from 'react';
import './App.css';

// Components
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <>
      <AppHeader />
      <div>
        <BurgerIngredients />
      </div>
    </>
  );
}

export default App;
