import { FC } from 'react';

// Styles
import styles from './scrolled-container.module.css';

type TScrolledContainer = {
  children: JSX.Element | Array<JSX.Element> | null | undefined;
}

const ScrolledContainer: FC<TScrolledContainer> = ({ children }) => {
  return (
    <div className={`${styles.scrolledContainer}`}>
      {children}
    </div>
  )
} 

export default ScrolledContainer;