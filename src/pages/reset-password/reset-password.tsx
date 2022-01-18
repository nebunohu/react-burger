import React, { FC, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FORGOT_PASSWORD_REDIRECT_CLEAR, resetPasswordRequest } from '../../services/actions/password-actions';

// Styles
import resetPassStyles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../utils/cookie';


const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ token: '', password: ''});
  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const isRedirect = useSelector(store => store.password.fromResetPasswordRedirect);

  useEffect(() => {
    dispatch({ type: FORGOT_PASSWORD_REDIRECT_CLEAR });
  });

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch( resetPasswordRequest( formState ));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState({ ...formState, [e.target.name]: e.target.value})
  }

  if(getCookie('token')) {
    navigate('/');
    return null;
  }

  if(typeof location.state === 'undefined') {
    navigate('/forgot-password');
    return null;
  }


  return (
    isRedirect ?
      <Navigate to='/login' replace />
    :
      <div className={resetPassStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Восстановление пароля</span>
        <form className={`${resetPassStyles.form} mt-6 mb-20`} onSubmit={onSubmitHandler} >
          <div className="mb-6">
            <PasswordInput 
              name='password' 
              value={formState.password}  
              onChange={handleChange} 
            />
          </div>  
          <div className="mb-6">
            <Input 
              type='text' 
              name='token' 
              placeholder='Введите код из письма' 
              value={formState.token} 
              onChange={handleChange} 
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

export default ResetPasswordPage;