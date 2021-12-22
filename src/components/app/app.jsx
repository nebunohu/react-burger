import { 
  Switch, 
  Route,
  useLocation,
  useHistory 
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Components
import AppHeader from '../app-header/app-header';
import LoginPage from '../../pages/login/login';
import ConstructorPage from '../../pages/constructor/constructor.jsx';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

// Actions
import { CLOSE_MODAL } from "../../services/actions/burger-actions";

//Styles
import appStyles from './app.module.css';

function App() {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL});
    history.push('/');
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/forgot-password' component={ForgotPasswordPage}/>
        <Route path='/reset-password' component={ResetPasswordPage}/>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/ingredients/:id' >
          <div className={appStyles.modal} >
            <span className='text text_type_main-large mt-10 mr-10 ml-10'>Детали ингредиента</span>
            <IngredientDetails />
          </div>
        </Route>
        <Route exact path="/" component={ConstructorPage} />
        <Route component={NotFound404} />
      </Switch>
      {background && <Route path='/ingredients/:id' >
        <Modal
          title='Детали ингредиента'
          closeModal={closeModal}
        >
          <IngredientDetails />
        </Modal>
      </Route>}
    </>
  );
}

export default App;
