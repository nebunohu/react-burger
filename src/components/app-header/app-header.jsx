import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import headerStyles from './app-header.module.css';

// Components
import { Logo, BurgerIcon, ListIcon , ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {
  return (
    <header>
      <nav>
        <ul className={headerStyles.headerUl}>
          <li className={`${headerStyles.active} ${headerStyles.listElement}`}>
            <Link className={`${headerStyles.link}`} to='/'><BurgerIcon type='primary' /> <span className='ml-2'>Конструктор</span></Link>
          </li>
          <li className={`${headerStyles.listElement} ${headerStyles.listElement}`}>
            <ListIcon type='secondary'/> <span className='ml-2'>Лента заказов</span>
          </li>
          <li className={`${headerStyles.logo} ${headerStyles.listElement}`}>
            <Logo />
          </li>
          <li className={`${headerStyles.profile} ${headerStyles.listElement}`}>
            <Link className={`${headerStyles.link}`} to='/profile'><ProfileIcon type='secondary'/> <span className='ml-2'>Личный кабинет</span></Link>
          </li>
        </ul>
      </nav>
    </header>
  );

}

export default AppHeader;