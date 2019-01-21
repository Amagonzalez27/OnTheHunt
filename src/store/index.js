import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { database } from '../config/firebase_config';

/**
 * ACTIONS
 */
const GET_USER = 'GET_USER';
const GET_JOBS = 'GET_JOBS';
const GET_USERS_JOBS = 'GET_USERS_JOBS';
const DELETE_JOB = 'DELETE_JOB';
const ADD_JOB = 'ADD_JOB';

/**
 * ACTION CREATORS
 */

export const getUser = user => ({
  type: GET_USER,
  user,
});

export const getJobs = jobs => ({
  type: GET_JOBS,
  jobs,
});

export const getSelectedJobs = jobs => ({
  type: GET_USERS_JOBS,
  jobs,
});

export const deleteJob = jobId => ({
  type: DELETE_JOB,
  jobId,
});

export const addToJobList = job => ({
  type: ADD_JOB,
  job,
});

/**
 * THUNK CREATORS
 */

export const fetchJobs = (des, loc) => {
  return dispatch => {
    let url = `https://jobs.github.com/positions.json?description=${des}&location=${loc}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        dispatch(getJobs(data));
      })
      .catch(error => console.log(error));
  };
};

export const fetchUsersJobs = userId => {
  return dispatch => {
    database
      .ref('jobs')
      .child(userId)
      .once('value')
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) {
          let data = snapshot.val();
          let results = Object.keys(data).map(key => data[key]);

          console.log(
            'DATA THAT WILL BE PASSED TO SAVED/APPLIED VIEWS:',
            results
          );
          dispatch(getSelectedJobs(data));
        }
      })
      .catch(error => console.log(error));
  };
};

/**
 * INITIAL STATE
 */

const initialState = {
  currentUser: {},
  jobs: [],
  usersSelectedJobs: {},
};

/**
 * REDUCER
 */

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.user };
    case GET_JOBS:
      return { ...state, jobs: action.jobs };
    case GET_USERS_JOBS:
      return {
        ...state,
        usersSelectedJobs: { ...state.usersSelectedJobs, ...action.jobs },
      };
    case DELETE_JOB:
      const job_id = action.jobId;

      const { [job_id]: job, ...otherJobs } = state.usersSelectedJobs;
      console.log(job, 'JOBID');
      console.log(otherJobs, 'Other');
      return {
        ...state,
        usersSelectedJobs: { ...otherJobs },
      };
    case ADD_JOB:
      console.log('users job:', state.usersSelectedJobs);
      return {
        ...state,
        usersSelectedJobs: {
          ...state.usersSelectedJobs,
          [action.job.id]: { ...action.job },
        },
      };

    default:
      return state;
  }
};

export default createStore(user, applyMiddleware(ThunkMiddleware));
