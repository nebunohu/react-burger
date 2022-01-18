// Components
import { FC } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

// Styles
import ingredientStyles from './ingredient.module.css';

const IngredientPage: FC = () => {
  return (
    <div className={ingredientStyles.modal} >
      <span className='text text_type_main-large mt-10 mr-10 ml-10'>Детали ингредиента</span>
      <IngredientDetails />
    </div>
  );
}

export default IngredientPage;