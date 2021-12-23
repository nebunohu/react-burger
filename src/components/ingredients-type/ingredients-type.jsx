import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import PropTypes from 'prop-types';

// Components
import IngredientsItem from "../ingredients-item/ingredients-item";

// Actions
import { UPDATE_CURRENT_TAB } from "../../services/actions/constructor-tab-actions";

// Data

// Styles
import typeStyles from './ingredients-type.module.css';

function IngredientsType(props) {
  //const { data } = React.useContext(AppContext);
  const dispatch = useDispatch();
  const data = useSelector(store => store.state.ingredients);
  const arrayOfElements = [];
  if(data) {
    data.forEach(el => {
      if(el.type === props.id)
        arrayOfElements.push(el);
    });
  }

  const { ref, inView, entry } = useInView({
    threshold: [0, 0.25, 0.5, 1]
  })

  React.useEffect(() => {
    dispatch({
      type: UPDATE_CURRENT_TAB,
      id: props.id,
      ratio: entry ? entry.intersectionRatio : 0
    });
  }, [inView, entry, dispatch, props.id]); // При изменении данных/скролле, обновляем ratio
  
  return (
    <div className={typeStyles.typeWrapper} ref={ref}>
      <div className='text text_type_main-medium mt-10 mb-6'>{props.type}</div>
      <div className={typeStyles.itemsWrapper}>
        {arrayOfElements.map(item => {
            return <IngredientsItem item={item} count={0} key={item._id} />
        })}
      </div>
    </div>
  );
}

IngredientsType.propTypes = {
  id: PropTypes.string.isRequired, 
  type: PropTypes.string.isRequired,
  refer:  PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
])
}

export default IngredientsType;