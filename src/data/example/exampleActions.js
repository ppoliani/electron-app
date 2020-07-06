import {createAction} from 'redux-actions';

export const EXAMPLE_ACTION = 'EXAMPLE:ACTION';
export const EXAMPLE_ASYNC_ACTION = 'EXAMPLE:ASYNC_ACTION';

export const runAction = () => {
  return createAction(EXAMPLE_ACTION)
}

const runAsyncActionRoot = fetch => () => {
  const runAsync = async () => {
    return await 'some value';
  }

  return createAction(
    EXAMPLE_ASYNC_ACTION
  )({async: runAsync()});
}

export const runAsyncAction = runAsyncActionRoot(fetch);
