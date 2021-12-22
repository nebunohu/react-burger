import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Styles
import headerStyles from './app-header.module.css';

// Components
import { Logo, BurgerIcon, ListIcon , ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {
  const location = useLocation();
  const state = location.pathname.split('/')[1];
  return (
    <header>
      <nav>
        <ul className={headerStyles.headerUl}>
          <li className={`${headerStyles.active} ${headerStyles.listElement}`}>
            <Link className={`${state === '' ? headerStyles.linkActive : headerStyles.link}`} to='/'>
              <BurgerIcon type={state === '' ? 'primary' : 'secondary'} /> <span className='ml-2'>Конструктор</span>
            </Link>
          </li>
          <li className={`${headerStyles.listElement} ${headerStyles.listElement}`}>
            <ListIcon type='secondary'/> <span className='ml-2'>Лента заказов</span>
          </li>
          <li className={`${headerStyles.logo} ${headerStyles.listElement}`}>
            <Logo />
          </li>
          <li className={`${headerStyles.profile} ${headerStyles.listElement}`}>
            <Link className={`${state === 'profile' ? headerStyles.linkActive : headerStyles.link}`} to='/profile'>
              <ProfileIcon type={state === 'profile' ? 'primary' : 'secondary'}/> <span className='ml-2'>Личный кабинет</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );

}

export default AppHeader;