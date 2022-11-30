import { FC, useState, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  changeSubtaskStatus,
  changeSubtaskTitle,
  removeSubtask,
} from '../../store/tasks/tasksActions';
import { Subtask } from '../../types/Task';
import styles from './SubtaskItem.module.scss';

interface Props {
  subtask: Subtask;
  taskId: string;
}

export const SubtaskItem: FC<Props> = (props) => {
  const { subtask, taskId } = props;

  const dispatch = useAppDispatch();

  const [isChangeTitleInputOpen, setIsChangeTitleInputOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(subtask.title);

  const handleChangeSubtaskStatus = () => {
    dispatch(
      changeSubtaskStatus({
        taskId,
        subtaskId: subtask.id,
      })
    );
  };

  const handleChangeSubtaskTittle = () => {
    setIsChangeTitleInputOpen(true);
  };

  const handleRemoveSubtask = () => {
    dispatch(
      removeSubtask({
        taskId,
        subtaskId: subtask.id,
      })
    );
  };

  const handleCancelEditSubtaskTitle = (event: MouseEvent) => {
    event.preventDefault();
    setIsChangeTitleInputOpen(false);
  };

  const handleApplySubtaskTittleChange = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      changeSubtaskTitle({
        taskId,
        subtaskId: subtask.id,
        title: newTitle,
      })
    );
    handleCancelEditSubtaskTitle(event);
  };

  return (
    <div key={subtask.id} className={styles.subtaskItem}>
      <div className={styles.title}>
        <input
          type="checkbox"
          checked={subtask.status}
          onChange={handleChangeSubtaskStatus}
        />
        {isChangeTitleInputOpen ? (
          <form className={styles.changeTitleForm}>
            <input
              className={styles.changeTitleInput}
              value={newTitle}
              onChange={(event) => {
                setNewTitle(event.currentTarget.value);
              }}
            />
            <div className={styles.buttons}>
              <button onClick={handleApplySubtaskTittleChange}>apply</button>
              <button onClick={handleCancelEditSubtaskTitle}>cancel</button>
            </div>
          </form>
        ) : (
          <div className={subtask.status ? styles.completedTaskTitle : ''}>
            {subtask.title}
          </div>
        )}
      </div>
      {!isChangeTitleInputOpen ? (
        <div className={styles.buttons}>
          <button onClick={handleChangeSubtaskTittle}>change</button>
          <button onClick={handleRemoveSubtask}>delete</button>
        </div>
      ) : null}
    </div>
  );
};
