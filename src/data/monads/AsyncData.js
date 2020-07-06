import union from 'folktale/adt/union/union';
import {constant} from '../../services/fn';

export const AsyncData = union('AsyncData', {
  Empty: () => true,
  Loading: data => ({data}),
  Success: data => ({data}),
  Failure: (error, data) => ({error, data})
});


AsyncData.map = function(f) {
  const identity = () => this;

  return this.matchWith({
    Empty: identity,
    Loading: identity,
    Success: ({data}) => AsyncData.Success(f(data)),
    Failure: identity
  });
};

AsyncData.mapPattern = function(patternName, defaultVal, f) {
  return this.matchWith({
    Empty: constant(defaultVal),
    Loading: constant(defaultVal),
    Success: constant(defaultVal),
    Failure: constant(defaultVal),

    // will override one of the above patterns
    [patternName]: f
  });
};
