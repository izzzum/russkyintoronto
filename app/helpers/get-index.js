import Ember from 'ember';

export function getIndex(params/*, hash*/) {
  return parseInt(params)+1;
}

export default Ember.Helper.helper(getIndex);
