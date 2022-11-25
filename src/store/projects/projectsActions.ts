import { ADD_PROJECT, REMOVE_PROJECT } from './projectsConsts';

export type AddProjectActionType = {
  type: typeof ADD_PROJECT;
  payload: {
    name: string;
  };
};

export type RemoveProjectActionType = {
  type: typeof REMOVE_PROJECT;
  payload: {
    id: number;
  };
};

export const addProject = (name: string): AddProjectActionType => ({
  type: ADD_PROJECT,
  payload: {
    name,
  },
});

export const removeProject = (id: number): RemoveProjectActionType => ({
  type: REMOVE_PROJECT,
  payload: {
    id,
  },
});
