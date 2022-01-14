import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { TLocationWithState } from '../../react-burger-env';
// Styles
import loginStyles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginRequest } from '../../services/actions/auth-actions';
import { getCookie } from '../../utils/cookie';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ email: '', password: ''});
  // @ts-ignore
  const auth = useSelector(store => store.auth);
  const location = useLocation() as TLocationWithState;

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    dispatch(loginRequest( formState ));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState({ ...formState, [e.target.name]: e.target.value})
  }
  if(!location.state === null) location.state.from = '/';

  // location.state.from
  return (
    auth.fromLoginRedirect || getCookie('token') ?
      <Navigate to={location.state.from} replace/>
    :
      <div className={loginStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Вход</span>
        <form className={`${loginStyles.form} mt-6 mb-20`} onSubmit={onSubmitHandler}>
          <div className="mb-6">
            <Input 
              type='email' 
              name='email' 
              placeholder='E-mail' 
              value={formState.email}
              onChange={handleChange}  
            />
          </div>
          <div className="mb-6">
            <PasswordInput 
              name='password' 
              value={formState.password}
              onChange={handleChange}  
             />
          </div>
          
          <Button type='primary' size='medium' >
            Войти
          </Button>
        </form>
        <span className="text text_type_main-small text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
        <span className="text text_type_main-small text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
      </div>
  );
}

export default LoginPage;