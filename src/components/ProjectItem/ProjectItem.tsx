import { FC, MouseEvent } from 'react';
import styles from './ProjectItem.module.scss';
import { Project } from '../../types/Project';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeProject } from '../../store/projects/projectsActions';
import { useNavigate } from 'react-router-dom';

interface Props {
  project: Project;
}

export const ProjectItem: FC<Props> = (props) => {
  const { project } = props;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/project/${project.id}`);
  };

  const handleDeleteProject = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(removeProject(project.id));
  };

  return (
    <div className={styles.item} onClick={handleItemClick}>
      <div>{project.name}</div>
      <button onClick={handleDeleteProject}>delete</button>
    </div>
  );
};
