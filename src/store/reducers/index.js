import { combineReducers } from 'redux';
import currenUser from './users';
import jobs from './jobs';
import usersSelectedJobs from './selectedJob';

export const rootReducer = combineReducers({
  currenUser,
  jobs,
  usersSelectedJobs,
});
