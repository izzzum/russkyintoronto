import Ember from 'ember';

export function arrayLength(params/*, hash*/) {
  return params[0].length;
}

export default Ember.Helper.helper(arrayLength);
