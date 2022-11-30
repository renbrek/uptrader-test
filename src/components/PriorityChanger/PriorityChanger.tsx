import { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { changeTaskPriority } from '../../store/tasks/tasksActions';
import { Priority, Task } from '../../types/Task';
import { RadioButton } from '../RadioButton/RadioButton';
import styles from './PriorityChanger.module.scss';

interface Props {
  task: Task;
}

export const PriorityChanger: FC<Props> = (props) => {
  const { task } = props;

  const dispatch = useAppDispatch();

  const [isChangePriorityOpen, setIsChangePriorityOpen] = useState(false);

  const handleOpenChangePriority = () => {
    setIsChangePriorityOpen(true);
  };

  const handleCloseChangePriority = () => {
    setIsChangePriorityOpen(false);
  };

  const handleChangePriority = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskPriority({
        taskId: task.id,
        newPriority: +event.currentTarget.value,
      })
    );
  };

  return (
    <div>
      <p>{`Priority ${task.priority + 1}`}</p>
      <div className={styles.buttons}>
        {isChangePriorityOpen ? (
          <>
            <button onClick={handleCloseChangePriority}>close</button>
            <div className={styles.priorities}>
              <RadioButton
                id={`priority-${Priority.Priority1}`}
                label={'Priority 1'}
                checked={task.priority === Priority.Priority1 ? true : false}
                value={Priority.Priority1}
                onChange={handleChangePriority}
              />
              <RadioButton
                id={`priority-${Priority.Priority2}`}
                label={'Priority 2'}
                checked={task.priority === Priority.Priority2 ? true : false}
                value={Priority.Priority2}
                onChange={handleChangePriority}
              />
              <RadioButton
                id={`priority-${Priority.Priority3}`}
                label={'Priority 3'}
                checked={task.priority === Priority.Priority3 ? true : false}
                value={Priority.Priority3}
                onChange={handleChangePriority}
              />
              <RadioButton
                id={`priority-${Priority.Priority4}`}
                label={'Priority 4'}
                checked={task.priority === Priority.Priority4 ? true : false}
                value={Priority.Priority4}
                onChange={handleChangePriority}
              />
            </div>
          </>
        ) : (
          <button onClick={handleOpenChangePriority}>change priorty</button>
        )}
      </div>
    </div>
  );
};
