import { FC } from 'react';
import { Priority } from '../../types/Task';
import styles from './RadioButton.module.scss';

interface Props {
  id: string;
  value: string | number | readonly string[] | undefined;
  checked: boolean;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioButton: FC<Props> = (props) => {
  const { id, value, checked, label, onChange } = props;
  return (
    <div className={styles.item}>
      <input
        id={id}
        type={'radio'}
        value={value as Priority}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
