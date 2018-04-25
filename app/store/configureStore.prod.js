import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import storage from '../utils/storage';

const enhancer = compose(
  middlewares,
  storage()
);

export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
