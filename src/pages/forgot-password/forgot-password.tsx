import { useState, FC } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
// Styles
import forgotPassStyles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPasswordRequest } from '../../services/actions/password-actions';

import { TLocationWithState } from '../../react-burger-env';

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ email: ''});
  const { password }= useSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation() as TLocationWithState;
  
  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(forgotPasswordRequest(formState['email']));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState({ ...formState, [e.target.name]: e.target.value})
  }

  if(localStorage.getItem('token')/*getCookie('token')*/) {
    navigate('/');
    return null;
  }

  return (
    password.fromForgotPasswordRedirect ?
      <Navigate to={'/reset-password'} state={ {from: location.pathname} } />
      :
      <div className={forgotPassStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Восстановление пароля</span>
        <form className={`${forgotPassStyles.form} mt-6 mb-20`} onSubmit={onSubmitHandler} >
          <div className="mb-6">
            <Input 
              type='email' 
              name='email' 
              placeholder='Укажите e-mail' 
              value={formState.email} 
              onChange={handleChange} 
            />
          </div>        
          <Button type='primary' size='medium' >
            Восстановить
          </Button>
        </form>
        <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
      </div>
    
    
  );
}

export default ForgotPasswordPage;