import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Styles
import ingredientdDetailsStyles from './ingredient-details.module.css';

// Components

// Data
import { DATA_TYPE } from "../../utils/type";

export default function IngredientDetails(props) {
  const currentIngredient = useSelector(store => store.state.currentIngredient)
  return (
    <>
      <div className={ingredientdDetailsStyles.imageWrapper+' mb-4'}>
        <img src={currentIngredient.image_large} alt='ингредиент' />
      </div>
      <div className={ingredientdDetailsStyles.nameWrapper+' mb-8'}>
        <span className="text text_type_main-medium">{currentIngredient.name}</span>
      </div>
      <ul className={ingredientdDetailsStyles.infoWrapper+' mb-15'}>
        <li className={`${ingredientdDetailsStyles.caloriesWrapper} ${ingredientdDetailsStyles.li}`}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Калории, ккал
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
            {currentIngredient.calories}
          </span>
        </li>
        <li className={ingredientdDetailsStyles.li}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Белки, г
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
          {currentIngredient.proteins}
          </span>
        </li>
        <li className={ingredientdDetailsStyles.li}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Жиры, г
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
          {currentIngredient.fat}
          </span>
        </li>
        <li className={ingredientdDetailsStyles.li}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Углеводы, г
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
          {currentIngredient.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}
