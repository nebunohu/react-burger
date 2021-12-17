import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';

// Components
import AppHeader from '../app-header/app-header';
import LoginPage from '../../pages/login/login';
import ConstructorPage from '../../pages/constructor/constructor.jsx';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredients/ingredients';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { ProtectedRoute } from '../protected-route/protected-route';

function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/forgot-password' component={ForgotPasswordPage}/>
        <Route path='/reset-password' component={ResetPasswordPage}/>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/ingredients/:id' component={IngredientPage}/>
        <Route exact path="/" component={ConstructorPage} />
        <Route component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default App;
