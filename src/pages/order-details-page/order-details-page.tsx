import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import BurgerCompositionElement from '../../components/burger-composition-element/burger-composition-enement';
import ScrolledContainer from '../../components/scrolled-container/scrolled-container';
import StatusComponent from '../../components/status-component/status-component';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN, WS_CONNECTION_CLOSE } from '../../services/actions/ws-actions';

// Styles
import styles from './order-details-page.module.css';

// Utils
import { dateOutput } from '../../utils/time';

const OrderDetailsPage: FC = () => {
  const dispatch = useDispatch();
  const { orders, wsConnected } = useSelector(store => store.ws);
  const ingredientsAll = useSelector(store => store.state.ingredients);
  const location = useLocation();
  const orderNumber = parseInt(location.pathname.split('/')[location.pathname.split('/').length-1]);
  const section = location.pathname.split('/')[location.pathname.split('/').length-2];
  const currentOrder = orders.find((el) => el.number === orderNumber);
  //const orderTime = !!currentOrder ? new Date(currentOrder.createdAt) : undefined;

  const totalCost = currentOrder?.ingredients.reduce((prev, currEl) => {
    const foundIngredient = ingredientsAll.find((el) => currEl === el._id);
    if(!foundIngredient) return prev;
    if(foundIngredient.type === 'bun') return prev + (foundIngredient!.price*2);
    else return prev + foundIngredient.price; 
  }, 0);

  const uniqueItemsOf = (arr: Array<string>): Array<{item: string, count: number}> => {
    let uniqueItems: Array<string> = [];
    let result: Array<{item: string, count: number}> = [];
    for(let item of arr) {
      if(!uniqueItems.includes(item)) uniqueItems.push(item);
    }

    for(let item of uniqueItems) {
      result.push({ item: item, count: arr.filter((el) => el === item).length});
    }
    
    return result;
  }

  const ingredients = !!currentOrder ? uniqueItemsOf(currentOrder.ingredients) : undefined;

  useEffect(() => {
    if(!wsConnected) {
      if(section === 'feed') {
        dispatch({type: WS_CONNECTION_START, payload: ''});
      } else {
        dispatch({type: WS_CONNECTION_START_WITH_TOKEN, payload: ''});
      }
    }
    return () => {
      if(wsConnected) dispatch({type: WS_CONNECTION_CLOSE, payload: ''});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (!currentOrder || !ingredients) {
    return null;
  }
  return (
    <div className={`${styles.wrapper} mt-15 mb-15 pl-10 mr-10`}>
      <div className={`${styles.nunber} text text_type_digits-default mb-10`}>#{currentOrder.number}</div>
      <div className={`${styles.name} text text_type_main-medium mb-3`}>{currentOrder.name}</div>
      <StatusComponent status={currentOrder.status} />
      <div className={`${styles.compositionWrapper} mt-15`}>
        <div className={`text text_type_main-medium mb-6`}>Состав:</div>
        <ScrolledContainer>
          {ingredients.map((el, index) => <BurgerCompositionElement className={'mb-4 pr-2'} ingredientId={el.item} count={el.count} key={index}/>)}
        </ScrolledContainer>
      </div>
      <div className={`${styles.footer} mt-10`}> 
        <div className={`text text_type_main-default text_color_inactive`}>
          {dateOutput(currentOrder.createdAt)}
        </div>
        <div className={`${styles.totalCost} text text_type_digits-default`}>
          <span className='mr-2'>{totalCost}</span><CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
} 

export default OrderDetailsPage;