import Ember from 'ember';

export function getPercent(params, args) {  
  return (args.fraction/args.total*100).toPrecision(5);
}

export default Ember.Helper.helper(getPercent);
