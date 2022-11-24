import React from 'react';
import styles from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { ProjectTasksPage } from './pages/ProjectTasksPage/ProjectTasksPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectsPage />,
  },
  {
    path: '/project/:id',
    element: <ProjectTasksPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const App = () => {
  return (
    <div className={styles.container}>
      <RouterProvider router={router} />
    </div>
  );
};
