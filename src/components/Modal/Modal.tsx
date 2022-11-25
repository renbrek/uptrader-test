import { FC, ReactNode, MouseEvent } from 'react';
import styles from './Modal.module.scss';

interface Props {
  opened: boolean;
  onClose(): void;
  title?: ReactNode;
  children?: ReactNode;
}

export const Modal: FC<Props> = (props) => {
  const { children, opened, onClose, title } = props;

  const handleAreaClick = (event: MouseEvent) => {
    onClose();
  };

  if (!opened) return null;

  return (
    <div className={styles.container} onClick={handleAreaClick}>
      <div
        className={styles.content}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.header}>
          {title ? <div className={styles.title}>{title}</div> : null}
          <button className={styles.closeButton} onClick={onClose}>
            {String.fromCharCode(10006)}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
