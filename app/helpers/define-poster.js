import Ember from 'ember';

export function definePoster(params, hash) {
  if(Ember.isPresent(hash.user)){
    return `id${hash.user}`;
  }
  else if(Ember.isPresent(hash.group)){
    return hash.group;
  }
}

export default Ember.Helper.helper(definePoster);
