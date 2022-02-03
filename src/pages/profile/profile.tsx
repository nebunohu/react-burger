import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from '../../hooks/hooks';
import { useLocation } from 'react-router';

// Styles
import profileStyles from './profile.module.css';
import { logoutRequest } from '../../services/actions/auth-actions';
import { getCookie } from '../../utils/cookie';
import ProfileForm from '../../components/profile-form/profile-form';
import ProfileOrders from '../../components/profile-orders/profile-orders';

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation(); 
  const isOrders = location.pathname.split('/')[2] === 'orders';

  function logoutHandler(e: React.MouseEvent<HTMLAnchorElement>): void {
    const token = getCookie('token');
    e.preventDefault();
    dispatch(logoutRequest({ "token": token }));
  }

  return (
    isOrders ?
      <div className={`${profileStyles.profileWrapper}`}>   
        <ul className={`${profileStyles.menuWrapper} mr-15`}>
          <li className={`${profileStyles.listItem}`}><Link className={`${profileStyles.itemLink}`} to='/profile'>Профиль</Link></li>
          <li className={`${profileStyles.listItem} ${profileStyles.activeListItem}`}>История заказов</li>
          <li className={profileStyles.listItem}><Link className={`${profileStyles.itemLink}`} to='/' onClick={logoutHandler}>Выход</Link></li>
          <li className={`${profileStyles.note} mt-20`}>В этом разделе вы можете изменить свои персональные данные</li>
        </ul>
      
        <ProfileOrders />
      </div>
      : 
      <div className={`${profileStyles.profileWrapper}`}>
        <ul className={`${profileStyles.menuWrapper} mr-15`}>
          <li className={`${profileStyles.listItem} ${profileStyles.activeListItem}`}>Профиль</li>
          <li className={profileStyles.listItem}><Link className={`${profileStyles.itemLink}`} to='/profile/orders'>История заказов</Link></li>
          <li className={profileStyles.listItem}><Link className={`${profileStyles.itemLink}`} to='/' onClick={logoutHandler}>Выход</Link></li>
          <li className={`${profileStyles.note} mt-20`}>В этом разделе вы можете изменить свои персональные данные</li>
        </ul>
      
        <ProfileForm />
      </div>
  );
}

export default ProfilePage;