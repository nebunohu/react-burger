import React from "react";

// Styles
import ingredientdDetailsStyles from './ingredient-details.module.css';

// Components
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientDetails(props) {
  return (
    <>
      <div className={`${ingredientdDetailsStyles.modalHeader} mt-10 mr-10 ml-10`}>
        <span className="text text_type_main-large">Детали ингредиента</span>
        <div className='close-button' style={{cursor: 'pointer'}} onClick={props.closeModal} >
          <CloseIcon type="primary" onClick={props.closeModal} />
        </div>
      </div>
      <div className={ingredientdDetailsStyles.imageWrapper+' mb-4'}>
        <img src={props.ingredient.image_large} alt='ингредиент' />
      </div>
      <div className={ingredientdDetailsStyles.nameWrapper+' mb-8'}>
        <span className="text text_type_main-medium">{props.ingredient.name}</span>
      </div>
      <ul className={ingredientdDetailsStyles.infoWrapper+' mb-15'}>
        <li className={`${ingredientdDetailsStyles.caloriesWrapper} ${ingredientdDetailsStyles.li}`}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Калории, ккал
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
            {props.ingredient.calories}
          </span>
        </li>
        <li className={ingredientdDetailsStyles.li}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Белки, г
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
          {props.ingredient.proteins}
          </span>
        </li>
        <li className={ingredientdDetailsStyles.li}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Жиры, г
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
          {props.ingredient.fat}
          </span>
        </li>
        <li className={ingredientdDetailsStyles.li}>
          <span className={ingredientdDetailsStyles.substance+' text text_type_main-default'}>
            Углеводы, г
          </span>
          <span className={ingredientdDetailsStyles.count+' text text_type_digits-default'}>
          {props.ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}