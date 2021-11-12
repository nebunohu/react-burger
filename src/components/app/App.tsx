import React from 'react';

// Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

// Styles
import AppStyles from './App.module.css';

// Data
//import { data } from '../../utils/data';


function App() {
  const dataURL = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = React.useState(
    {
      burger: {
        bun: {},
        ingredients: [],
      }, 
      data: []
    }
  );

  React.useEffect(() => {
    const getIngredientsData = async () => {
      let headers = new Headers({ "content-type": "application/json" });
      try {
        const res = await fetch(dataURL, { method: "GET", mode: "cors", headers});
        if(res.ok) {
          const data = await res.json();
          setState({
            ...state,
            data: data.data,
            burger: {
              bun: data.data[0],
              ingredients: data.data
            }
          });
        } else {
          throw new Error('Fetch error'); 
        }
        
      } catch (e) {
        console.log(e);
      }
      
    }

    getIngredientsData();
});

  return (
    <>
      <AppHeader />
      <div className={AppStyles.BurgerWrapper}>
        <BurgerIngredients data={state.data} />
        <BurgerConstructor burger={state.burger} /> 
      </div>
    </>
  );
}

export default App;
