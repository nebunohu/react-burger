import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Styles
import registerStyles from './register.module.css';
import { /*EmailInput,*/ Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUserRequest } from '../../services/actions/register-actions';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [ formState, setFormState ] = useState({ email: '', name: '', password: ''});

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

  /*function onChangeHandler(e) {
    e.preventDefault();
    const target = e.target;
    if (target.name !== 'password') setFormState({ ...formState, [target.name]: target.value}); 
  }*/

  return (
    <div className={registerStyles.loginFormWrapper}>
      <span className="text text_type_main-default">Зарегистрироваться</span>
      <form className={`${registerStyles.form} mt-6 mb-20`} ref={formRef}
      >
        <div className="mb-6">
          <Input 
            type='text' 
            name='name' 
            placeholder='Имя' 
            value={formState.name}  
            onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value})}  
          />
        </div>
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
        
        <Button type='primary' size='medium' onClick={onClickHandler}>
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
    </div>
  );
}