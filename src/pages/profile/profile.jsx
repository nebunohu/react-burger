import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import profileStyles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUser, getUser } from '../../services/actions/user-actions';
import { logoutRequest } from '../../services/actions/auth-actions';
import { getCookie } from '../../utils/cookie';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { user, auth } = useSelector(store => store);
  const [formState, setFormState] = useState({ ...user, password: '123456' });
  const [changedFormElements, setChangedFormElements] = useState([]);

  useEffect(() => {
    if ( typeof auth.accessToken !== 'undefined' ) dispatch(getUser(auth.accessToken));
  },[dispatch, auth.accessToken]);

  useEffect(() => {
    setFormState({ ...user, password: '123456' })
  }, [user]);

  function onFocusHandler(e) {
    e.preventDefault();
    if ( e.target.name === 'password' ) {
      setFormState({ ...formState, password: '' });
    }
  }

  function onChangeHandler(e) {
    e.preventDefault();
    setIsEdit(true);
    const target = e.target;
    setFormState({ ...formState, [target.name]: target.value}); 
  }

  function onSaveHandler(e) {
    e.preventDefault();
    const body = {};
    changedFormElements.forEach( (el) =>  body[el] = formState[el]);
    
    setChangedFormElements([]);
    setIsEdit(false);
    dispatch(editUser(body, auth.accessToken));
  }

  function onCancelClickHandler(e) {
    e.preventDefault();
    setFormState({ ...user, password: '123456' }); 
    setIsEdit(false);
  }

  function logoutHandler(e) {
    const token = getCookie('token');
    e.preventDefault();
    dispatch(logoutRequest({ "token": token }));
  }

  return (
    <div className={`${profileStyles.profileWrapper}`}>
      <ul className={`${profileStyles.menuWrapper} mr-15`}>
        <li className={`${profileStyles.listItem} ${profileStyles.activeListItem}`}>Профиль</li>
        <li className={profileStyles.listItem}><Link className={`${profileStyles.itemLink}`} to='/orders'>История заказов</Link></li>
        <li className={profileStyles.listItem}><Link className={`${profileStyles.itemLink}`} to='/' onClick={logoutHandler}>Выход</Link></li>
        <li className={`${profileStyles.note} mt-20`}>В этом разделе вы можете изменить свои персональные данные</li>
      </ul>
      <div className={profileStyles.propertiesFormWrapper}>
        <form className={`${profileStyles.form} mb-20`} onChange={onChangeHandler} onFocus={onFocusHandler} onSubmit={onSaveHandler}>
          <div className="mb-6">
            <Input 
              type='text' 
              name='name' 
              placeholder='Имя' 
              value={formState.name} 
              icon='EditIcon' 
              size='default' 
              onChange={e => {
                if(!changedFormElements.includes(e.target.name)) setChangedFormElements([...changedFormElements, e.target.name]);
                setFormState({ ...formState, [e.target.name]: e.target.value});
              }}
            />
          </div>
          <div className="mb-6">
            <Input 
              type='email' 
              name='email' 
              placeholder='E-mail' 
              value={formState.email} 
              icon='EditIcon' 
              onChange={e => {
                if(!changedFormElements.includes(e.target.name)) setChangedFormElements([...changedFormElements, e.target.name]);
                setFormState({ ...formState, [e.target.name]: e.target.value});
              }} 
            />
          </div>
          <div className="mb-10">
            <Input 
              type='password' 
              name='password' 
              placeholder='Пароль' 
              value={formState.password} 
              icon='EditIcon' 
              onChange={e => {
                if(!changedFormElements.includes(e.target.name)) setChangedFormElements([...changedFormElements, e.target.name]);
                setFormState({ ...formState, [e.target.name]: e.target.value});
              }}
            />
          </div>
          {isEdit && (
            <div className={`${profileStyles.buttonsWrapper}`}>
              <Button>Сохранить</Button>
              <Button onClick={onCancelClickHandler}>Отмена</Button>
            </div>
            
          )}
        </form>
      </div>
    </div>
  );
}