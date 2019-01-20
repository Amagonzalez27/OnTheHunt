import GET_USER from '../actions/usersActions';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};
