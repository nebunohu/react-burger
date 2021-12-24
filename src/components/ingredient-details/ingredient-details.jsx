import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";

// Styles
import ingredientdDetailsStyles from './ingredient-details.module.css';

// Components

// Actions
import { SET_CURRENT_INGREDIENT } from "../../services/actions/burger-actions";

// Data

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const { ingredients, currentIngredient } = useSelector(store => store.state);
  const location = useLocation();
  const urlId = location.pathname.split('/')[2];

  useEffect( () => {
    if(typeof currentIngredient !== 'undefined') {
      if(Object.keys(currentIngredient).length === 0 && ingredients.length !== 0) {
        dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredients.find(el => el._id === urlId)});
        return null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, currentIngredient]);

  if(ingredients.length === 0 || typeof currentIngredient === 'undefined') {
    return null;
  }

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
