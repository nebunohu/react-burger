import { FC } from 'react';
import { Link } from 'react-router-dom';

// Styles
import notFoundStyles from './not-found-404.module.css'

const NotFound404: FC = () => {
  return (
    <div className={notFoundStyles.noticeWrapper}>
      <span className={notFoundStyles.notice}>Упс... Страница не найдена</span>
      <Link to='/'>Вернуться на главную</Link>
    </div>
  )
}

export default NotFound404;