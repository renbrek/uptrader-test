import { FC, useState } from 'react';
import { Task } from '../../types/Task';
import { Modal } from '../Modal/Modal';
import { TaskDetails } from '../TaskDetails/TaskDetails';
import styles from './TaskItem.module.scss';

interface Props {
  task: Task;
  onClick?(): void;
}

export const TaskItem: FC<Props> = (props) => {
  const { task, onClick } = props;

  return (
    <>
      <div className={styles.item} onClick={onClick}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <br />
        <span>id: {task.id}</span>
      </div>
    </>
  );
};
