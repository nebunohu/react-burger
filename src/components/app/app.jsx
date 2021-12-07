import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

// Actions
import { getIngredients, CLOSE_MODAL} from '../../services/actions/burgerActions';

function App() {

  const {modal} = useSelector(store => store.state);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
    
  }, [dispatch]);

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
  }

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={AppStyles.BurgerWrapper}>
          <BurgerIngredients />
          <BurgerConstructor /> 
        </div>
      </DndProvider>
      {modal.isModalOpen && modal.isIngredModal &&   
        <Modal 
          title='Детали ингредиента'
          closeModal={closeModal}
        >
          <IngredientDetails />
        </Modal>}
      {modal.isModalOpen && modal.isOrderModal && 
        <Modal
          title=''
          closeModal={closeModal}
        >
          <OrderDetails />
        </Modal>}
    </>
  );
}

export default App;
