import { Link } from 'react-router-dom';
// Styles
import registerStyles from './register.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function RegisterPage() {
  return (
    <div className={registerStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Зарегистрироваться</span>
      <form className={`${registerStyles.form} mt-6 mb-20`}>
        <div className="mb-6">
          <Input type='text' placeholder='Имя' value='' />
        </div>
        <div className="mb-6">
          <Input type='email' placeholder='E-mail' />
        </div>
        <div className="mb-6">
          <PasswordInput />
        </div>
        
        <Button type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
    </div>
  );
}