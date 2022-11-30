import { FC, useState, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { changeTaskDescription } from '../../store/tasks/tasksActions';
import { Task } from '../../types/Task';
import styles from './TaskDescription.module.scss';

interface Props {
  task: Task;
}

export const TaskDescription: FC<Props> = (props) => {
  const { task } = props;

  const dispatch = useAppDispatch();

  const description = task.description ? task.description : '';

  const [isEditDescriptionFormOpen, setIsEditDescriptionFormOpen] =
    useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const handleOpenEditDescriptionForm = (event: MouseEvent) => {
    event.preventDefault();
    setIsEditDescriptionFormOpen(true);
  };

  const handleCancelEditDescription = (event: MouseEvent) => {
    event.preventDefault();
    setIsEditDescriptionFormOpen(false);
    setNewDescription(description);
  };

  const handleEditDescription = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      changeTaskDescription({
        taskId: task.id,
        newDescription,
      })
    );
    setIsEditDescriptionFormOpen(false);
  };

  return (
    <div>
      {!isEditDescriptionFormOpen ? (
        <button onClick={handleOpenEditDescriptionForm}>
          {task.description ? `Edit description` : 'Add discription'}
        </button>
      ) : null}
      <div className={styles.description}>
        {isEditDescriptionFormOpen ? (
          <form className={styles.form}>
            <input
              type="text"
              value={newDescription}
              onChange={(event) => {
                setNewDescription(event.currentTarget.value);
              }}
            />
            <div className={styles.buttons}>
              <button onClick={handleEditDescription}>apply</button>
              <button onClick={handleCancelEditDescription}>cancel</button>
            </div>
          </form>
        ) : (
          <div>{task.description}</div>
        )}
      </div>
    </div>
  );
};
