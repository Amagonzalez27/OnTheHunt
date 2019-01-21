import { database } from '../../config/firebase_config';

const GET_USERS_JOBS = 'GET_USERS_JOBS';
const DELETE_JOB = 'DELETE_JOB';
const ADD_JOB = 'ADD_JOB';

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

export const selectedJob = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_JOBS:
      return { ...state, ...action.jobs };
    case DELETE_JOB:
      const job_id = action.jobId;
      const { [job_id]: job, ...otherJobs } = state;

      return {
        ...otherJobs,
      };
    case ADD_JOB:
      return {
        ...state,
        [action.job.id]: { ...action.job },
      };
    default:
      return state;
  }
};
