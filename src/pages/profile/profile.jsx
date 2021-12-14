import { Link } from 'react-router-dom';
// Styles
import profileStyles from './profile.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ProfilePage() {
  return (
    <div className={profileStyles.profileWrapper}>
      <div className={profileStyles.menuWrapper}>
        Меню
      </div>
      <div className={profileStyles.propertiesFormWrapper}>
        <span className="text text_type_main-default">Зарегистрироваться</span>
        <form className={`${profileStyles.form} mt-6 mb-20`}>
          <div className="mb-6">
            <Input type='text' placeholder='Имя' />
          </div>
          <div className="mb-6">
            <EmailInput name='email' placeholder='E-mail' />
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
    </div>
  );
}