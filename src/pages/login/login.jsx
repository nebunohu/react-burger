import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Styles
import loginStyles from './login.module.css';
import { /*EmailInput,*/ Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginRequest } from '../../services/actions/auth-actions';

export default function LoginPage() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [ formState, setFormState ] = useState({ email: '', password: ''});
  const isRedirect = useSelector(store => store.auth.fromLoginRedirect)

  function onClickHandler(e) {
    let body = {};
    e.preventDefault();

    Array.from(formRef.current).forEach((el, index) => {
      if ( index !== formRef.current.length - 1 ) {
        body[el.name] = el.value;
      }
    });
    dispatch(loginRequest( body ));
  }

  return (
    isRedirect ?
      <Redirect to='/' />
    :
      <div className={loginStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Вход</span>
        <form className={`${loginStyles.form} mt-6 mb-20`} ref={formRef} >
          <div className="mb-6">
            <Input 
              type='email' 
              name='email' 
              placeholder='E-mail' 
              value={formState.email}
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})}  
            />
          </div>
          <div className="mb-6">
            <PasswordInput 
              name='password' 
              value={formState.password}
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})}  
             />
          </div>
          
          <Button type='primary' size='medium' onClick={onClickHandler}>
            Войти
          </Button>
        </form>
        <span className="text text_type_main-small text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
        <span className="text text_type_main-small text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
      </div>
  );
}