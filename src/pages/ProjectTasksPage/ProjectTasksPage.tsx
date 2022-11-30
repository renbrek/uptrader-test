import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  selectProjectTasks,
  selectTaskById,
} from '../../store/tasks/tasksSelectors';
import { selectProjectById } from '../../store/projects/projectsSelectors';
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerActivationConstraint,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Column } from '../../components/Column/Column';
import styles from './ProjectTasksPage.module.scss';
import { TaskItem } from '../../components/TaskItem/TaskItem';
import { changeTaskStatus } from '../../store/tasks/tasksActions';
import { Status } from '../../types/Task';

export const ProjectTasksPage = () => {
  const { id: projectId } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const currentProject = useAppSelector((state) =>
    selectProjectById(state, projectId ? projectId : '')
  );

  const projectTasks = useAppSelector((state) =>
    selectProjectTasks(state, projectId ? projectId : '')
  );

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const [search, setSearch] = useState('');

  const filteredProjectTasks = projectTasks.filter(
    (task) =>
      task.id.toLowerCase().includes(search.toLowerCase()) ||
      task.title.toLowerCase().includes(search.toLowerCase())
  );

  const activationConstraint: PointerActivationConstraint = {
    distance: 15,
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {};

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    // console.log('active id', active);
    // console.log('over id', over);
    // console.log('Drag end called');

    if (active.id !== over?.id) {
      const activeIndex = task ? projectTasks.indexOf(task) : 0;
      const overIndex = task ? projectTasks.indexOf(task) : 0;

      dispatch(changeTaskStatus(active.id as string, over?.id as Status));
    }
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = useAppSelector((state) =>
    activeTaskId ? selectTaskById(state, activeTaskId) : null
  );

  return (
    <>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          {String.fromCharCode(8592)}
        </button>
        <h1>{currentProject?.name}</h1>
        <input
          placeholder="Search tasks"
          value={search}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
          }}
        />
      </div>
      <div className={styles.columnsContainer}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.columnsContainer}>
            <Column
              id={'queue'}
              title={'queue'}
              tasks={filteredProjectTasks.filter(
                (task) => task.status === 'queue'
              )}
              projectId={projectId ? projectId : ''}
            />
            <Column
              id={'development'}
              title={'development'}
              tasks={filteredProjectTasks.filter(
                (task) => task.status === 'development'
              )}
              projectId={projectId ? projectId : ''}
            />
            <Column
              id={'done'}
              title={'done'}
              tasks={filteredProjectTasks.filter(
                (task) => task.status === 'done'
              )}
              projectId={projectId ? projectId : ''}
            />
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};
