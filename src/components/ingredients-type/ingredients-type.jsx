import React from "react";

// Components
import IngredientsItem from "../ingredients-item/ingredients-item";

// Data
import { data } from '../../utils/data';

// Styles
import typeStyles from './ingredients-type.module.css';

class IngredientsType extends React.Component {
  render() {
    const arrayOfElements = [];
    data.forEach(el => {
      if(el.type === this.props.type)
        arrayOfElements.push(el);
    });
    return (
      <div className={typeStyles.typeWrapper+' mt-10'}>
        <span className='text text_type_main-medium'>{this.props.typeRus}</span>
        <div className={typeStyles.itemsWrapper}>
          {arrayOfElements.map(item => {
              return <IngredientsItem item={item} key={item._id} />
          })}
        </div>
      </div>
    );
  }
}

export default IngredientsType;