import { Link } from 'react-router-dom';
// Styles
import resetPassStyles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ResetPasswordPage() {
  return (
    <div className={resetPassStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Восстановление пароля</span>
      <form className={`${resetPassStyles.form} mt-6 mb-20`}>
        <div className="mb-6">
          <PasswordInput />
        </div>  
        <div className="mb-6">
          <Input type='email' placeholder='Введите код из письма' />
        </div>        
        <Button type='primary' size='medium'>
          Сохранить
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
    </div>
  );
}