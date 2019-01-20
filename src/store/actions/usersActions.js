import { database } from '../../config/firebase_config';

export const GET_USER = 'GET_USER';

const getUser = user => ({
  type: GET_USER,
  user,
});

export const fetchUser = userId => {
  return async dispatch => {
    const snapshot = await database
      .ref('users')
      .child(userId)
      .once('value');
    const exists = snapshot.val() !== null;

    if (exists) {
      const data = snapshot.val();
      const action = getUser(data);
      dispatch(action);
    }
  };
};
