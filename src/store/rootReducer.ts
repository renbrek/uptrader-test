import { combineReducers } from 'redux';
import { projectsReducer } from './projects/projectsReducer';

export const rootReducer = combineReducers({
  projects: projectsReducer,
});
