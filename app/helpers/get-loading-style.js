import Ember from 'ember';

export function getLoadingStyle(params/*, hash*/) {
  return `<div style="left:${params}%;" class="overlay-rate"></div>`;
}

export default Ember.Helper.helper(getLoadingStyle);
