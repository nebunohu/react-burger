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
  const [state, setState] = React.useState(
    {
      burger: {
        bun: {},
        ingredients: [],
      },
      isModalOpen: false,
      isIngredModal: false,
      isOrderModal: false,
      modalIngredientId: '',
    }
  );
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getIngredientsData = async () => {
      let headers = new Headers({ "content-type": "application/json" });
      try {
        const res = await fetch(dataURL, { method: "GET", mode: "cors", headers});
        if(res.ok) {
          const data = await res.json();
          setData(data.data);
          /*setState({
            ...state,
            burger: {
              bun: data[0],
              ingredients: data
            }
          })*/
        } else {
          throw new Error('Fetch error'); 
        }
        
      } catch (e) {
        console.log(e);
      }
      
    }

    getIngredientsData();
}, [data]);

function openModal(e: any) {
    if(e.currentTarget.className.match(/ingredients-item/i)) {
      setState({
        ...state,
        isIngredModal: true,
        isModalOpen: true,
        modalIngredientId: e.currentTarget.dataset.id,
      });
    } else if(e.currentTarget.className.match(/button/i)) {
      setState({
        ...state,
        isOrderModal: true,
        isModalOpen: true,
        
      });
    }
    
}

function closeModal(e : any) {
  if(e.target === e.currentTarget) {
    setState({
      ...state,
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
        <BurgerConstructor burger={state.burger} openModal={openModal} /> 
      </div>
      {state.isModalOpen && 
        <Modal 
          closeModal={closeModal} 
            modalState={{
              isIngredModal: state.isIngredModal,
              isOrderModal: state.isOrderModal,
              modalIngredientId: state.modalIngredientId,
            }}
            data={data}
        />
      }
    </>
  );
}

export default App;
