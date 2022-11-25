import { Project } from '../../types/Project';
import {
  AddProjectActionType,
  RemoveProjectActionType,
} from './projectsActions';
import { ADD_PROJECT, REMOVE_PROJECT } from './projectsConsts';

const projectsInitialState: Project[] = [];

type ProjectActionsType = AddProjectActionType | RemoveProjectActionType;

export const projectsReducer = (
  state = projectsInitialState,
  action: ProjectActionsType
) => {
  switch (action.type) {
    case ADD_PROJECT: {
      const newState: Project[] = [
        ...state,
        {
          id: Date.now(),
          name: action.payload.name,
        },
      ];

      return newState;
    }
    case REMOVE_PROJECT: {
      return state.filter((project) => project.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};
