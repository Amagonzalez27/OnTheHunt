import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { database } from '../config/firebase_config';
// ACTION
const GET_USER = 'GET_USER';
const GET_JOBS = 'GET_JOBS';
const CHANGE_LOCATION = 'CHANGE_LOCATION';
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
const GET_SELECTED_JOBS = 'GET_SELECTED_JOBS';

export const getUser = user => ({
  type: GET_USER,
  user,
});

export const getJobs = jobs => ({
  type: GET_JOBS,
  jobs,
});

export const changeLocation = text => ({
  type: CHANGE_LOCATION,
  text,
});
export const changeDescription = text => ({
  type: CHANGE_LOCATION,
  text,
});

export const getSelectedJobs = jobs => ({
  type: GET_SELECTED_JOBS,
  jobs,
});

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
          dispatch(getSelectedJobs(results));
        }
      })
      .catch(error => console.log(error));
  };
};

const initialState = {
  currentUser: {},
  description: '',
  location: '',
  jobs: [],
  usersSelectedJobs: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.user };
    case CHANGE_LOCATION:
      return { ...state, location: action.text };
    case CHANGE_DESCRIPTION:
      return { ...state, description: action.text };
    case GET_JOBS:
      return { ...state, descripton: '', location: '', jobs: action.jobs };
    case GET_SELECTED_JOBS:
      return { ...state, usersSelectedJobs: action.jobs };
    default:
      return state;
  }
};

export default createStore(user, applyMiddleware(ThunkMiddleware));
