import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
// Styles
import forgotPassStyles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPasswordRequest } from '../../services/actions/password-actions';
import { getCookie } from '../../utils/cookie';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ email: ''});
  const { password }= useSelector(store => store);
  const history = useHistory();
  
  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(forgotPasswordRequest(formState['email']));
  }

  if(getCookie('token')) {
    history.replace('/');
    return null;
  }

  return (
    password.fromForgotPasswordRedirect ?
      <Redirect to={{
        pathname: '/reset-password',
        state: { from: history.location.pathname }
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
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})} 
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