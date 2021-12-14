import { Link } from 'react-router-dom';
// Styles
import forgotPassStyles from './forgot-password.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ForgotPasswordPage() {
  return (
    <div className={forgotPassStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Восстановление пароля</span>
      <form className={`${forgotPassStyles.form} mt-6 mb-20`}>
        <div className="mb-6">
          <Input type='email' placeholder='Укажите e-mail' value='' />
        </div>        
        <Button type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
    </div>
  );
}