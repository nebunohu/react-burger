import React from 'react';

// Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';

// Styles
import AppStyles from './App.module.css';

// Data
//import { data } from '../../utils/data';


function App() {
  const dataURL = 'https://norma.nomoreparties.space/api/ingredients';
  const [burger, setBurger] = React.useState(
    {
      bun: {},
      ingredients: [],      
    }
  );
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState({
    isModalOpen: false,
    isIngredModal: false,
    isOrderModal: false,
    modalIngredientId: '',
  });

  React.useEffect(() => {
    const getIngredientsData = async () => {
      let headers = new Headers({ "content-type": "application/json" });
      try {
        const res = await fetch(dataURL, { method: "GET", mode: "cors", headers});
        if(res.ok) {
          const data = await res.json();
          setData(data.data);
        } else {
          throw new Error('Fetch error'); 
        }
        
      } catch (e) {
        console.log(e);
      }
      
    }

    getIngredientsData();
  }, [data]);

  /*React.useEffect(() => {
    setBurger({
      ...burger,
      bun: data[0],
      ingredients: data,
    });
  });*/

  function openModal(e: any) {
    if(e.currentTarget.className.match(/ingredients-item/i)) {
      setModal({
        ...modal,
        isIngredModal: true,
        isModalOpen: true,
        modalIngredientId: e.currentTarget.dataset.id,
      });
    } else if(e.currentTarget.className.match(/button/i)) {
      setModal({
        ...modal,
        isOrderModal: true,
        isModalOpen: true,
        
      });
    }
    
  }

  function closeModal(e : any) {
    if(e.target === e.currentTarget) {
      setModal({
        ...modal,
        isIngredModal: false,
        isOrderModal: false,
        isModalOpen: false,
      });
    }
  }


  return (
    <>
      <AppHeader />
      <div className={AppStyles.BurgerWrapper}>
        <BurgerIngredients data={data} openModal={openModal} />
        <BurgerConstructor burger={burger} openModal={openModal} /> 
      </div>
      {modal.isModalOpen && 
        <Modal 
          closeModal={closeModal} 
            modalState={{
              isIngredModal: modal.isIngredModal,
              isOrderModal: modal.isOrderModal,
              modalIngredientId: modal.modalIngredientId,
            }}
            data={data}
        />
      }
    </>
  );
}

export default App;
