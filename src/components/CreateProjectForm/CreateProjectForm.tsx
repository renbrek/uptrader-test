import { useState, MouseEvent, useEffect } from 'react';
import styles from './CreateProjectForm.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addProject } from '../../store/projects/projectsActions';

export const CreateProjectForm = () => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const dispatch = useAppDispatch();

  const handleAddProject = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(addProject(name));
    setName('');
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
      <button onClick={handleAddProject} disabled={!isNameValid}>
        Add
      </button>
    </form>
  );
};
