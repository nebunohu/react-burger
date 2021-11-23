import React from 'react';

// Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

// Styles
import AppStyles from './app.module.css';

// Data
//import { impData } from '../../utils/data';
import { AppContext } from '../../services/appContext';

function App() {
  const dataURL = 'https://norma.nomoreparties.space/api/ingredients';
  /*const [burger, setBurger] = React.useState(
    {
      bun: {},
      ingredients: [],      
    }
  );*/
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState({
    isModalOpen: false,
    isIngredModal: false,
    isOrderModal: false,
  });
  const [currentIngredient, seCurrentIngredient] = React.useState({});

  React.useEffect(() => {
    const getIngredientsData = async () => {
      const headers = new Headers({ 
        "content-type": "application/json",
       });
      try {
        const res = await fetch(dataURL, { method: "GET", mode: "cors", headers});
        if(res.ok) {
          const resData = await res.json();
          setData(resData.data);
        } else {
          
          throw new Error('Fetch error'); 
        }
        
      } catch (e) {
        console.log(e);
      }
      
    }

    getIngredientsData();
    
  }, []);


  /*React.useEffect(() => {
    const ingredients = data.filter(el => el.type !== 'bun');
    setBurger({
      bun: data[0],
      ingredients: ingredients,
    });
  }, [data]);*/

  function openIngredientsModal(item) {
    setModal({
      ...modal,
      isIngredModal: true,
      isModalOpen: true,
    });
    seCurrentIngredient(item);
  }
  
  function openOrderModal(e) {
    setModal({
      ...modal,
      isOrderModal: true,
      isModalOpen: true,
      
    });
  }

  const closeModal = (e) => {
    setModal({
      ...modal,
      isIngredModal: false,
      isOrderModal: false,
      isModalOpen: false,
    });
  }

  return (
    <AppContext.Provider value={{data, setData}}>
      <AppHeader />
      <div className={AppStyles.BurgerWrapper}>
        <BurgerIngredients openModal={openIngredientsModal} />
        <BurgerConstructor openModal={openOrderModal} /> 
      </div>
      {modal.isModalOpen && modal.isIngredModal &&   
        <Modal 
          closeModal={closeModal} 
          title='Детали ингредиента'
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}
      {modal.isModalOpen && modal.isOrderModal && 
        <Modal
          closeModal={closeModal} 
          title=''
        >
          <OrderDetails orderNumber='000000' />
        </Modal>}
      
    </AppContext.Provider>
  );
}

export default App;
