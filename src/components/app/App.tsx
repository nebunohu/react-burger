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
          const resData = await res.json();
          setData(resData.data);
          //data = resData.data.slice();
        } else {
          throw new Error('Fetch error'); 
        }
        
      } catch (e) {
        console.log(e);
      }
      
    }

    getIngredientsData();
    
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  }, []);

  React.useEffect(() => {
    setBurger({
      bun: data[0],
      ingredients: data,
    });
  }, [data]);

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
    e.stopPropagation();
    if(e.target === e.currentTarget || e.type === 'keydown') {
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
