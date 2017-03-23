import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    /*keyForAttribute: function(key) {
        if(key === 'photo75') {
                return 'photo_75';
        }
        else if(key === 'photo130'){
                return 'photo_130';
        }
        else if(key === 'photo604'){
                return 'photo_604';
        }
        else if(key === 'photo807'){
                return 'photo_807';
        }
        else if(key === 'photo1280'){
                return 'photo_1280';
        }
        else{
    return Ember.String.underscore(key);
        }
  }*/
  keyForAttribute: function(key) {
const regex = /\D\d/g;
let m;

if ((m = regex.exec(key)) !== null) {
    m.forEach((match, groupIndex) => {
        key = key.slice(0, key.indexOf(match)+1) + "_" + key.slice(key.indexOf(match)+1);
    });
    return key;
}
        else{
    return Ember.String.underscore(key);
        }
  }
});
