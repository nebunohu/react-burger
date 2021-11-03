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
            <li>
              <BurgerIcon /> Конструктор
            </li>
            <li>
              <ListIcon /> Лента заказов
            </li>
            <li className={headerStyles.logo}>
              <Logo />
            </li>
            <li className={headerStyles.profile}>
              <ProfileIcon /> Личный кабинет     
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;