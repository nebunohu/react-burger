import React from "react";
import PropTypes from 'prop-types';

// Components
import IngredientsItem from "../ingredients-item/ingredients-item";

// Data
import { DATA_TYPE } from "../../utils/type";
//import { data } from '../../utils/data';
import { AppContext } from "../../services/appContext";

// Styles
import typeStyles from './ingredients-type.module.css';

function IngredientsType(props) {
  const { data } = React.useContext(AppContext);
  const arrayOfElements = [];
  if(data) {
    data.forEach(el => {
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
  type: PropTypes.string.isRequired, 
  typeRus: PropTypes.string.isRequired
}

export default IngredientsType;