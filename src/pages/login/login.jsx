import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
// Styles
import loginStyles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginRequest, refreshToken } from '../../services/actions/auth-actions';
import { getCookie } from '../../utils/cookie';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [ formState, setFormState ] = useState({ email: '', password: ''});
  const auth = useSelector(store => store.auth);
  const history = useHistory();

  /*useEffect(() => {
    const token = getCookie('token');
    if ( typeof token !== 'undefined')  {
      dispatch(refreshToken({ "token": token }));
      
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])*/

  function onSubmitHandler(e) {
    e.preventDefault();

    dispatch(loginRequest( formState ));
  }

  return (
    auth.fromLoginRedirect || getCookie('token') ?
      <Redirect to={history.location.state.from} />
    :
      <div className={loginStyles.loginFormWrapper}>
        <span className="text text_type_main-default">Вход</span>
        <form className={`${loginStyles.form} mt-6 mb-20`} onSubmit={onSubmitHandler}>
          <div className="mb-6">
            <Input 
              type='email' 
              name='email' 
              placeholder='E-mail' 
              value={formState.email}
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})}  
            />
          </div>
          <div className="mb-6">
            <PasswordInput 
              name='password' 
              value={formState.password}
              onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})}  
             />
          </div>
          
          <Button type='primary' size='medium' >
            Войти
          </Button>
        </form>
        <span className="text text_type_main-small text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
        <span className="text text_type_main-small text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
      </div>
  );
}