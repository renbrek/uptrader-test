import { useState, MouseEvent, useEffect, FC } from 'react';
import styles from './CreateProjectForm.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addProject } from '../../store/projects/projectsActions';

interface Props {
  closeModal(): void;
}

export const CreateProjectForm: FC<Props> = (props) => {
  const { closeModal } = props;
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(addProject(name));
    setName('');
    closeModal();
  };

  useEffect(() => {
    name ? setIsNameValid(true) : setIsNameValid(false);
  }, [name]);

  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
          value={name}
        />
      </div>
      <button onClick={handleSubmit} disabled={!isNameValid}>
        Add
      </button>
    </form>
  );
};
