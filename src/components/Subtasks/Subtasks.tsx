import { FC } from 'react';
import { Task } from '../../types/Task';
import { AddSubtaskForm } from '../AddSubtaskForm/AddSubtaskForm';
import { SubtaskItem } from '../SubtaskItem/SubtaskItem';
import styles from './Subtasks.module.scss';

interface Props {
  task: Task;
}

export const Subtasks: FC<Props> = (props) => {
  const { task } = props;

  return (
    <div>
      {task.subtasks.length ? (
        <div>
          {task.subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} taskId={task.id} />
          ))}
          <AddSubtaskForm taskId={task.id} />
        </div>
      ) : (
        <AddSubtaskForm taskId={task.id} />
      )}
    </div>
  );
};
