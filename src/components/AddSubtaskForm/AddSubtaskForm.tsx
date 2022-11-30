import { FC, useState, MouseEvent } from 'react';
import styles from './AddSubtaskForm.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addSubtask } from '../../store/tasks/tasksActions';

interface Props {
  taskId: string;
}

export const AddSubtaskForm: FC<Props> = (props) => {
  const { taskId } = props;

  const dispatch = useAppDispatch();

  const [isCreateSubtaskFormOpen, setIsCreateSubtaskFormOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleOpenAddSubtaskForm = () => {
    setIsCreateSubtaskFormOpen(true);
  };

  const handleCloseAddSubtaskForm = (event: MouseEvent) => {
    event.preventDefault();
    setTitle('');
    setIsCreateSubtaskFormOpen(false);
  };

  const handleAddSubtask = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      addSubtask({
        taskId,
        title,
      })
    );
    setTitle('');
    setIsCreateSubtaskFormOpen(false);
  };

  return (
    <>
      {isCreateSubtaskFormOpen ? (
        <form className={styles.addTaskForm}>
          <input
            type="text"
            placeholder="Enter subtask title"
            onChange={(event) => {
              setTitle(event.currentTarget.value);
            }}
            value={title}
          ></input>
          <div className={styles.formButtons}>
            <button onClick={handleAddSubtask} disabled={!title}>
              add
            </button>
            <button onClick={handleCloseAddSubtaskForm}>cancel</button>
          </div>
        </form>
      ) : null}
      {!isCreateSubtaskFormOpen ? (
        <button onClick={handleOpenAddSubtaskForm}>add subtask +</button>
      ) : null}
    </>
  );
};
