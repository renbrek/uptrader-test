import { useState } from 'react';
import styles from './ProjectsPage.module.scss';
import { CreateProjectForm } from '../../components/CreateProjectForm/CreateProjectForm';
import { Modal } from '../../components/Modal/Modal';
import { ProjectItem } from '../../components/ProjectItem/ProjectItem';
import { useAppSelector } from '../../hooks/reduxHooks';

export const ProjectsPage = () => {
  const [isCreateProjectFormOpen, setIsCreateProjectFormOpen] = useState(false);

  const projects = useAppSelector((state) => state.projects);

  const handleAddProject = () => {
    setIsCreateProjectFormOpen(true);
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>Projects</h1>
        <button onClick={handleAddProject} className={styles.addButton}>
          Add project <h2>+</h2>
        </button>
        <div className={styles.projects}>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
      <Modal
        title={<h2>Create Project</h2>}
        opened={isCreateProjectFormOpen}
        onClose={() => setIsCreateProjectFormOpen(false)}
      >
        <CreateProjectForm closeModal={() => setIsCreateProjectFormOpen(false)}/>
      </Modal>
    </>
  );
};
