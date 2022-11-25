import { useParams } from 'react-router-dom';

export const ProjectTasksPage = () => {
  const { id } = useParams();
  return (
    <div>
      <div>ProjectTasksPage</div>
      <div>{id}</div>
    </div>
  );
};
