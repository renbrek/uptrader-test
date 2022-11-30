import { FC, useState, MouseEvent, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTask } from '../../store/tasks/tasksActions';
import { Priority, Status } from '../../types/Task';
import { RadioButton } from '../RadioButton/RadioButton';
import styles from './CreateTaskForm.module.scss';

interface Props {
  taskStatus: Status;
  projectId: string;
  closeModal(): void;
}

export const CreateTaskForm: FC<Props> = (props) => {
  const { taskStatus, projectId, closeModal } = props;

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(Priority.Priority1);

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      addTask({
        title,
        description,
        priority,
        status: taskStatus,
        subtasks: [],
        comments: [],
        attachedFiles: [],
        projectId,
      })
    );
    setTitle('');
    setDescription('');
    closeModal();
  };

  useEffect(() => {
    title ? setIsTitleValid(true) : setIsTitleValid(false);
  }, [title]);

  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
          value={title}
        />
        <label htmlFor="description">Description (optional)</label>
        <input
          type="text"
          id="description"
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
          value={description}
        />
        <label>Priority</label>
        <div className={styles.priorities}>
          <RadioButton
            id={`priority-${Priority.Priority1}`}
            label={'Priority 1'}
            checked={priority === Priority.Priority1 ? true : false}
            value={Priority.Priority1}
            onChange={(event) => {
              setPriority(+event.currentTarget.value);
            }}
          />
          <RadioButton
            id={`priority-${Priority.Priority2}`}
            label={'Priority 2'}
            checked={priority === Priority.Priority2 ? true : false}
            value={Priority.Priority2}
            onChange={(event) => {
              setPriority(+event.currentTarget.value);
            }}
          />
          <RadioButton
            id={`priority-${Priority.Priority3}`}
            label={'Priority 3'}
            checked={priority === Priority.Priority3 ? true : false}
            value={Priority.Priority3}
            onChange={(event) => {
              setPriority(+event.currentTarget.value);
            }}
          />
          <RadioButton
            id={`priority-${Priority.Priority4}`}
            label={'Priority 4'}
            checked={priority === Priority.Priority4 ? true : false}
            value={Priority.Priority4}
            onChange={(event) => {
              setPriority(+event.currentTarget.value);
            }}
          />
        </div>
      </div>
      <button onClick={handleSubmit} disabled={!isTitleValid}>
        add
      </button>
    </form>
  );
};
