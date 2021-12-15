import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Styles
import forgotPassStyles from './forgot-password.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPasswordRequest } from '../../services/actions/password-actions';

export default function ForgotPasswordPage() {
  const formRef = useRef();
  const dispatch = useDispatch();
  
  function onClickHandler(e) {
    e.preventDefault();
    dispatch(forgotPasswordRequest(formRef.current[0].value));
  }

  return (
    <div className={forgotPassStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Восстановление пароля</span>
      <form className={`${forgotPassStyles.form} mt-6 mb-20`} ref={formRef}>
        <div className="mb-6">
          <Input type='email' placeholder='Укажите e-mail' />
        </div>        
        <Button type='primary' size='medium' onClick={onClickHandler}>
          Восстановить
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
    </div>
  );
}