import Ember from 'ember';

export function getPercent(params, args) {
  let result = (args.fraction/args.total*100);
  if(parseInt(result).toString === 1){
    result = result.toPrecision(3);
  }
  else if(parseInt(result).toString === 2){
    result = result.toPrecision(4);
  }
  else{
    result = result.toPrecision(3);
  }
  return result;
}

export default Ember.Helper.helper(getPercent);
