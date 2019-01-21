import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default createStore(rootReducer, applyMiddleware(ThunkMiddleware));
