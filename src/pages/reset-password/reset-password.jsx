import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { resetPasswordRequest } from '../../services/actions/password-actions';

// Styles
import resetPassStyles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../utils/cookie';


export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ token: '', password: ''});
  const history = useHistory();
  const isRedirect = useSelector(store => store.password.fromResetPasswordRedirect);

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch( resetPasswordRequest( formState ));
  }

  if(getCookie('token')) {
    history.replace('/');
    return null;
  }

  if(typeof history.location.state === 'undefined') {
    history.replace('/forgot-password');
    return null;
  }


  return (
    isRedirect ?
      <Redirect to='/login' />
    :
      <div className={resetPassStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Восстановление пароля</span>
        <form className={`${resetPassStyles.form} mt-6 mb-20`} onSubmit={onSubmitHandler} >
          <div className="mb-6">
            <PasswordInput 
              name='password' 
              value={formState.password}  
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})} 
            />
          </div>  
          <div className="mb-6">
            <Input 
              type='text' 
              name='token' 
              placeholder='Введите код из письма' 
              value={formState.token} 
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})} 
            />
          </div>        
          <Button type='primary' size='medium' >
            Сохранить
          </Button>
        </form>
        <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
      </div>
  );
}