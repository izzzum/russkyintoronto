import Ember from 'ember';

export function getLoadingStyle(params/*, hash*/) {
  return `<div class="progress-bar" role="progressbar" style="width:${params}%;" aria-valuenow="${params}" aria-valuemin="0" aria-valuemax="100"><span>${params}%</span></div>`;
}

export default Ember.Helper.helper(getLoadingStyle);
