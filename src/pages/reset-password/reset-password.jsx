import { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { resetPasswordRequest } from '../../services/actions/password-actions';
//import { getCookie } from '../../utils/cookie';

// Styles
import resetPassStyles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [ formState, setFormState ] = useState({ token: '', password: ''});
  const isRedirect = useSelector(store => store.password.fromResetPasswordRedirect);

  function onClickHandler(e) {
    e.preventDefault();
    dispatch( resetPasswordRequest({
      "password": formRef.current[0].value,
      "token": formRef.current[1].value
    }));
  }

  /*function onChangeHandler(e) {
    e.preventDefault();
    const target = e.target;
    if (target.name !== 'password') setFormState({ ...formState, [target.name]: target.value}); 
  }*/

  return (
    isRedirect ?
      <Redirect to='/login' />
    :
      <div className={resetPassStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Восстановление пароля</span>
        <form className={`${resetPassStyles.form} mt-6 mb-20`} ref={formRef} >
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
          <Button type='primary' size='medium' onClick={onClickHandler}>
            Сохранить
          </Button>
        </form>
        <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
      </div>
  );
}