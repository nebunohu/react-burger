import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Styles
import registerStyles from './register.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUserRequest } from '../../services/actions/register-actions';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const formRef = useRef();

  function onClickHandler(e) {
    let body ={};
    e.preventDefault();

    Array.from(formRef.current).forEach((el, index) => {
      if ( index !== formRef.current.length - 1 ) {
        body[el.name] = el.value;
      }
    });
    dispatch(registerUserRequest(body));
  }

  return (
    <div className={registerStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Зарегистрироваться</span>
      <form className={`${registerStyles.form} mt-6 mb-20`} ref={formRef}>
        <div className="mb-6">
          <Input type='text' name='name' placeholder='Имя' />
        </div>
        <div className="mb-6">
          <Input type='email' name='email' placeholder='E-mail' />
        </div>
        <div className="mb-6">
          <PasswordInput name='password' />
        </div>
        
        <Button type='primary' size='medium' onClick={onClickHandler}>
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
    </div>
  );
}