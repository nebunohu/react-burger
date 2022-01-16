import { useEffect, FC } from 'react';
import { 
  Routes, 
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Components
import AppHeader from '../app-header/app-header';
import LoginPage from '../../pages/login/login';
import ConstructorPage from '../../pages/constructor/constructor';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import OrdersPage from '../../pages/orders/orders';
import IngredientPage from '../../pages/ingredient/ingredient';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

// Actions
import { CLOSE_MODAL, getIngredients } from "../../services/actions/burger-actions";
import { refreshToken } from '../../services/actions/auth-actions';

//Styles

// Utils
import { getCookie } from '../../utils/cookie';

interface ILocationState {
  background: string;
}

const App: FC = () => {
  const location = useLocation();
  const state = location.state as ILocationState; // Есть ли вариант сделать это как-то иначе?
  const navigate = useNavigate();
  const background = state && state.background;
  const dispatch = useDispatch();

  useEffect( () => {
    const token = getCookie('token');

    dispatch(getIngredients());
    if(token) dispatch(refreshToken({token}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
    navigate('/');
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route 
          path='/profile' 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path="/" element={<ConstructorPage />} />
        <Route element={<NotFound404 />} />
      
      {background && <Route path='/ingredients/:id' >
        <Modal
          title='Детали ингредиента'
          closeModal={closeModal}
        >
          <IngredientDetails />
        </Modal>
      </Route>}
      </Routes>
    </>
  );
}

export default App;
