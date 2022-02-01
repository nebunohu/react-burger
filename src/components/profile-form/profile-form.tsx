import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";

// Components
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

// Styles 
import profileFormStyles from './profile-form.module.css';

// Actions
import { editUser } from "../../services/actions/user-actions";

interface IFormState {
  [name: string]: string;
}

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector(store => store);
  const [isEdit, setIsEdit] = useState(false);
  const [formState, setFormState] = useState<IFormState>({ 'name': user.name, 'email': user.email, 'password': '123456' });
  const [changedFormElements, setChangedFormElements] = useState<Array<string>>([]);

  useEffect(() => {
    setFormState({ 'name': user.name, 'email': user.email, password: '123456' })
  }, [user]);

  function onFocusHandler(e: React.FocusEvent<HTMLFormElement>): void {
    e.preventDefault();
    if ( e.target.name === 'password' ) {
      setFormState({ ...formState, password: '' });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setIsEdit(true);
    if(!changedFormElements.includes(e.target.name)) setChangedFormElements([...changedFormElements, e.target.name]);
    setFormState({ ...formState, [e.target.name]: e.target.value});
  }

  function onSaveHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const body: IFormState = {};
    changedFormElements.forEach( (el) =>  body[el] = formState[el]);
    
    setChangedFormElements([]);
    setIsEdit(false);
    dispatch(editUser(body, auth.accessToken));
  }

  function onCancelClickHandler(e: React.SyntheticEvent<Element, Event>): void {
    e.preventDefault();
    setFormState({ 'name': user.name, 'email': user.email, password: '123456' }); 
    setIsEdit(false);
  }

  return (
    <div className={profileFormStyles.propertiesFormWrapper}>
        <form className={`${profileFormStyles.form} mb-20`} onFocus={onFocusHandler} onSubmit={onSaveHandler}>
          <div className="mb-6">
            <Input 
              type='text' 
              name='name' 
              placeholder='Имя' 
              value={formState.name} 
              icon='EditIcon' 
              size='default' 
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input 
              type='email' 
              name='email' 
              placeholder='E-mail' 
              value={formState.email} 
              icon='EditIcon' 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-10">
            <Input 
              type='password' 
              name='password' 
              placeholder='Пароль' 
              value={formState.password} 
              icon='EditIcon' 
              onChange={handleChange}
            />
          </div>
          {isEdit && (
            <div className={`${profileFormStyles.buttonsWrapper}`}>
              <Button type='secondary' onClick={onCancelClickHandler}>Отмена</Button>
              <Button>Сохранить</Button>
            </div>
            
          )}
        </form>
      </div>
  )
}

export default ProfileForm;