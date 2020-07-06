import {createStore, applyMiddleware, compose} from 'redux';
import asyncMiddleware from '../middleware/asyncMiddleware';
import reducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  {},
  composeEnhancer(applyMiddleware(asyncMiddleware))
);
