import { Link } from 'react-router-dom';

// Styles
import notFoundStyles from './not-found-404.module.css'
export default function NotFound404() {
  return (
    <div className={notFoundStyles.noticeWrapper}>
      <span className={notFoundStyles.notice}>Упс... Страница не найдена</span>
      <Link to='/'>Вернуться на главную</Link>
    </div>
  )
}