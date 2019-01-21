const GET_JOBS = 'GET_JOBS';

export const getJobs = jobs => ({
  type: GET_JOBS,
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

export const jobs = (state = [], action) => {
  switch (action.type) {
    case GET_JOBS:
      return action.jobs;

    default:
      return state;
  }
};
