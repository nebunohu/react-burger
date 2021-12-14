import { Link } from 'react-router-dom';
// Styles
import loginStyles from './login.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginPage() {
  return (
    <div className={loginStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Вход</span>
      <form className={`${loginStyles.form} mt-6 mb-20`}>
        <div className="mb-6">
          <Input type='email' placeholder='E-mail' />
        </div>
        <div className="mb-6">
          <PasswordInput />
        </div>
        
        <Button type='primary' size='medium'>
          Войти
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
      <span className="text text_type_main-small text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
    </div>
  );
}