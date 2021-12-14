import loginStyles from './login.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginPage() {
  return (
    <div className={loginStyles.loginFormWrapper}>
      <span>Вход</span>
      <form>
        <Input type='email' />
        <PasswordInput />
        <Button type='primary' size='medium'>
          Войти
        </Button>
      </form>
      <span>Вы новый пользователь? Зарегистрироваться</span>
      <span>Забыли пароль? Восстановить пароль</span>
    </div>
  );
}