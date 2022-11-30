import { FC } from 'react';
import styles from './TaskDetails.module.scss';
import { Task } from '../../types/Task';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeTask } from '../../store/tasks/tasksActions';
import dayjs from 'dayjs';
import { TaskComments } from '../TaskComments/TaskComments';
import { AttachedFiles } from '../AttachedFiles/AttachedFiles';
import { Section } from './Section/Section';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { Subtasks } from '../Subtasks/Subtasks';
import { PriorityChanger } from '../PriorityChanger/PriorityChanger';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
  task: Task;
}

dayjs.extend(relativeTime);

export const TaskDetails: FC<Props> = (props) => {
  const { task } = props;

  const dispatch = useAppDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button onClick={handleRemoveTask}>delete task</button>
      </div>
      <p>{task.status}</p>

      {task.developmentStartTime ? (
        <div>
          {dayjs(task.developmentStartTime).to(task.doneTime, true)} in
          development
        </div>
      ) : null}

      <div>
        Created {dayjs(task.creationDate).format('DD MMMM YYYY [at] HH:mm')}
      </div>

      {task.doneTime ? (
        <div>Done {dayjs(task.doneTime).format('DD MMMM YYYY [at] HH:mm')}</div>
      ) : null}

      <PriorityChanger task={task} />

      <Section header={<>Desctiption</>}>
        <TaskDescription task={task} />
      </Section>

      <Section header={'Subtask'}>
        <Subtasks task={task} />
      </Section>

      <Section header={<>Attached Files</>}>
        <AttachedFiles task={task} />
      </Section>

      <Section header={<>Comments</>}>
        <TaskComments taskId={task.id} />
      </Section>

      <p>id: {task.id}</p>
    </div>
  );
};
