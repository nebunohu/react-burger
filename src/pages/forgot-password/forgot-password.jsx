import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
// Styles
import forgotPassStyles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPasswordRequest } from '../../services/actions/password-actions';
import { getCookie } from '../../utils/cookie';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ email: ''});
  const { password }= useSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation();
  
  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(forgotPasswordRequest(formState['email']));
  }

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value})
  }

  if(getCookie('token')) {
    navigate('/');
    return null;
  }

  return (
    password.fromForgotPasswordRedirect ?
      <Navigate to={{
        pathname: '/reset-password',
        state: { from: location.pathname }
      }}
       />
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