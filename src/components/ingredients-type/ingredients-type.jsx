import React from "react";
import PropTypes from 'prop-types';

// Components
import IngredientsItem from "../ingredients-item/ingredients-item";

// Data
//import { data } from '../../utils/data';

// Styles
import typeStyles from './ingredients-type.module.css';

const DATA_TYPE =  {
  "_id": PropTypes.string,
  "name": PropTypes.string,
  "type": PropTypes.string,
  "proteins": PropTypes.number,
  "fat": PropTypes.number,
  "carbohydrates": PropTypes.number,
  "calories": PropTypes.number,
  "price": PropTypes.number,
  "image": PropTypes.string,
  "image_mobile": PropTypes.string,
  "image_large": PropTypes.string,
  "__v": PropTypes.number
};

function IngredientsType(props) {
  const arrayOfElements = [];
  if(props.data) {
    props.data.forEach(el => {
      if(el.type === props.type)
        arrayOfElements.push(el);
    });
  }
  
  return (
    <div className={typeStyles.typeWrapper}>
      <div className='text text_type_main-medium mt-10 mb-6'>{props.typeRus}</div>
      <div className={typeStyles.itemsWrapper}>
        {arrayOfElements.map(item => {
            return <IngredientsItem item={item} count={0} openModal={props.openModal} key={item._id} />
        })}
      </div>
    </div>
  );
}

IngredientsType.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(DATA_TYPE)),
  type: PropTypes.string.isRequired, 
  typeRus: PropTypes.string.isRequired
}

export default IngredientsType;