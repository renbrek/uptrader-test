import { useDroppable } from '@dnd-kit/core';
import {  FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Status, Task } from '../../types/Task';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { Modal } from '../Modal/Modal';
import { TaskItemWrapper } from '../TaskItem/TaskItemWrapper';
import styles from './Column.module.scss';

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  projectId: string;
}

export const Column: FC<Props> = (props) => {
  const { id, tasks, title, projectId } = props;

  const dispatch = useAppDispatch();

  const { setNodeRef, over, isOver, active } = useDroppable({
    id,
  });

  const [isCreateTaskFormOpen, setIsCreateTaskFormOpen] = useState(false);

  const titleToStatus = (title: string): Status => {
    if (title === 'queue') return title;
    if (title === 'development') return title;
    return 'done';
  };

  const status = titleToStatus(title);

  const handleAddTaks = () => {
    setIsCreateTaskFormOpen(true);
  };

  const style = {
    backgroundColor: isOver ? 'gray' : undefined,
  };

  return (
    <>
      <div className={styles.column} style={style} ref={setNodeRef}>
        <div className={styles.header}>
          {title.toUpperCase()}
          <button onClick={handleAddTaks}>+</button>
        </div>
        {tasks.map((task) => (
          <TaskItemWrapper key={task.id} task={task} />
        ))}
      </div>
      <Modal
        title={<h2>{`Create ${status} task`}</h2>}
        opened={isCreateTaskFormOpen}
        onClose={() => setIsCreateTaskFormOpen(false)}
      >
        <CreateTaskForm
          taskStatus={status}
          projectId={projectId}
          closeModal={() => setIsCreateTaskFormOpen(false)}
        />
      </Modal>
    </>
  );
};
