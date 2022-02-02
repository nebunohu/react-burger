import { FC } from "react";

// Styles
import styles from './status-component.module.css';

type TStatusComponentProps = {
  status: string;
}

const StatusComponent: FC<TStatusComponentProps> = ({status}) => {
  const displayStatus = (status: string): string => {
    let returnString = '';
    switch (status) {
      case 'done': 
        returnString = 'Выполнен';
      break;
      case 'pending': 
        returnString = 'Готовится';
      break;
      default: 
        returnString = 'Создан';
    }
    return returnString;
  }
  return (
    <div className={`${styles.status} text text_type_main-small ${styles[status]}`}>
        {displayStatus(status)}
      </div>
  );
};

export default StatusComponent;