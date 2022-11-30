import { FC, useState } from 'react';
import { Task } from '../../types/Task';
import { Modal } from '../Modal/Modal';
import { TaskDetails } from '../TaskDetails/TaskDetails';
import { TaskTitleHeader } from '../TaskTitleHeader/TaskTitleHeader';
import { DraggableTaskItem } from './DraggableTaskItem';
import { TaskItem } from './TaskItem';

interface Props {
  task: Task;
}

export const TaskItemWrapper: FC<Props> = (props) => {
  const { task } = props;

  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  return (
    <>
      <DraggableTaskItem key={task.id} id={task.id.toString()}>
        <TaskItem task={task} onClick={() => setIsTaskDetailsOpen(true)} />
      </DraggableTaskItem>
      <Modal
        title={<TaskTitleHeader task={task} />}
        opened={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
      >
        <TaskDetails task={task} />
      </Modal>
    </>
  );
};
