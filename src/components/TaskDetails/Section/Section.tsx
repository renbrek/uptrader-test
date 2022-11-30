import { FC, ReactNode } from 'react';
import styles from './Section.module.scss';

interface Props {
  header?: ReactNode;
  children?: ReactNode;
}

export const Section: FC<Props> = (props) => {
  const { children, header } = props;
  return (
    <div className={styles.section}>
      <h4 className={styles.label}>{header}</h4>

      {children}
    </div>
  );
};
