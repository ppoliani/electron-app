import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {AsyncData} from '../monads/AsyncData';
import {EXAMPLE_ACTION, EXAMPLE_ASYNC_ACTION} from './exampleActions';


const handleAction = (state, {payload}) => state.set('actionResult', payload);
const handleAsyncAction = (state, {payload}) => state.set('asyncActionResult', payload);

const ExampleModel = Map({
  actionResult: AsyncData.Empty(),
  asyncActionResult: AsyncData.Empty()
});

export default handleActions({
  [EXAMPLE_ACTION]: handleAction,
  [EXAMPLE_ASYNC_ACTION]: handleAsyncAction,
}, ExampleModel)

