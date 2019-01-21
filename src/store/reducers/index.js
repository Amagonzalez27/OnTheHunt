import { combineReducers } from 'redux';
import currentUser from './users';
import jobs from './jobs';
import usersSelectedJobs from './selectedJob';

export const rootReducer = combineReducers({
  currentUser,
  jobs,
  usersSelectedJobs,
});
