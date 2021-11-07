import React from 'react';

// Styles
import headerStyles from './app-header.module.css';

// Components
import { Logo, BurgerIcon, ListIcon , ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';


class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
            <li className={headerStyles.active}>
              <BurgerIcon type='primary' /> <span className='ml-2'>Конструктор</span>
            </li>
            <li>
              <ListIcon type='secondary'/> <span className='ml-2'>Лента заказов</span>
            </li>
            <li className={headerStyles.logo}>
              <Logo />
            </li>
            <li className={headerStyles.profile}>
              <ProfileIcon type='secondary'/> <span className='ml-2'>Личный кабинет</span>    
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;