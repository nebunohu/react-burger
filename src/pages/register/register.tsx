import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { Link, useNavigate } from 'react-router-dom';
// Styles
import registerStyles from './register.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUserRequest } from '../../services/actions/register-actions';

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.auth);
  const [ formState, setFormState ] = useState({ email: '', name: '', password: ''});
  const navigate = useNavigate();

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(registerUserRequest(formState));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState({ ...formState, [e.target.name]: e.target.value})
  }


  useEffect(() => {
    if ( localStorage.getItem('accessToken') ) {
      navigate('/');
    }
    
  },[navigate, isAuth]);

  if ( localStorage.getItem('accessToken')/*getCookie('token')*/ ) {
    return null;
  }

  return (
    <div className={registerStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Зарегистрироваться</span>
      <form className={`${registerStyles.form} mt-6 mb-20`} onSubmit={onSubmitHandler} >
        <div className="mb-6">
          <Input 
            type='text' 
            name='name' 
            placeholder='Имя' 
            value={formState.name}  
            onChange={handleChange}  
          />
        </div>
        <div className="mb-6">
          <Input 
            type='email' 
            name='email' 
            placeholder='E-mail' 
            value={formState.email} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-6">
          <PasswordInput 
            name='password' 
            value={formState.password} 
            onChange={handleChange} 
          />
        </div>
        
        <Button type='primary' size='medium' >
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
    </div>
  );
}

export default RegisterPage;