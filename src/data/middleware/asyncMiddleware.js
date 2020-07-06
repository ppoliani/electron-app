import {fromJS} from 'immutable'
import {AsyncData} from '../monads/AsyncData'

const isPromise = val => val && typeof val.then === 'function';

export default ({dispatch}) => next => action => {
  const {async, ...optional} = action.payload || {};

  return isPromise(async)
    ? dispatch({...action, payload: AsyncData.Loading(fromJS(optional))}) && async
      .then(result => {
        if(Array.isArray(result)) {
          dispatch({
            ...action,
            payload: AsyncData.Success(fromJS({...optional, list: result}))
          });
        }
        else {
          dispatch({
            ...action,
            payload: AsyncData.Success(fromJS({...optional, ...result}))
          });
        }
      })
      .catch(error => dispatch({
        ...action,
        payload: AsyncData.Failure(error, fromJS(optional)),
        error: true,
        errorMessage: error.message
      }))
    : next(action);
};
