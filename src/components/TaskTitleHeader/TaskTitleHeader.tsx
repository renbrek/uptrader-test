import { FC, useState, MouseEvent } from 'react';
import styles from './TaskTitleHeader.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { changeTaskTitle } from '../../store/tasks/tasksActions';
import { Task } from '../../types/Task';

interface Props {
  task: Task;
}

export const TaskTitleHeader: FC<Props> = (props) => {
  const { task } = props;

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(task.title);
  const [isChangeTitleFormOpen, setIsChangeTitleFormOpen] = useState(false);

  const handleOpenChangeTitleForm = (event: MouseEvent) => {
    setIsChangeTitleFormOpen(true);
  };

  const handleCancelChangeTitle = (event: MouseEvent) => {
    event.preventDefault();
    setTitle(task.title);
    setIsChangeTitleFormOpen(false);
  };

  const handleChangeTaskTitle = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(changeTaskTitle(task.id, title));
    setIsChangeTitleFormOpen(false);
  };

  return (
    <div className={styles.container}>
      {isChangeTitleFormOpen ? (
        <form>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.currentTarget.value);
            }}
          />
          <div>
            <button onClick={handleChangeTaskTitle}>change</button>
            <button onClick={handleCancelChangeTitle}>cancel</button>
          </div>
        </form>
      ) : (
        <h2>{task.title}</h2>
      )}
      {!isChangeTitleFormOpen ? (
        <button onClick={handleOpenChangeTitleForm}>change title</button>
      ) : null}
    </div>
  );
};
