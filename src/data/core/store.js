import {createStore, applyMiddleware, compose} from 'redux';
import asyncMiddleware from '../middleware/asyncMiddleware';
import reducer from './reducer';

export default createStore(
  reducer,
  {},
  compose(applyMiddleware(asyncMiddleware))
);
